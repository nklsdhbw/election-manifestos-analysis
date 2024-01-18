import os
import re
import csv
from collections import Counter
import nltk
from nltk.corpus import stopwords
import ssl
import shutil

# TODO: fix the issue to remove stopwords, since now nltk is not working

# using SSL to download nltk (code from https://stackoverflow.com/questions/41348621/ssl-error-downloading-nltk-data)
try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context
nltk.download('stopwords')

stop_words = set(stopwords.words('german'))

def top_words(filepath, top_n=30):
    file = open(filepath, 'r', encoding='utf-8')
    text = file.read()
    file.close()

    text = text.lower()
    text = re.sub('[^a-zäöüß]', ' ', text)

    single_words = text.split()

    counter1 = Counter()
    for word in single_words:
        if word not in stop_words:
            counter1[word] += 1

    top_words = counter1.most_common(top_n)

    return top_words

def folder(folder_path):
    target_folder = "./top_words"

    if not os.path.exists(target_folder):
        os.makedirs(target_folder)

    for filename in os.listdir(folder_path):
        if filename.endswith('.txt'):
            file_path = os.path.join(folder_path, filename)
            top_worte_liste = top_words(file_path)

            csv_dateiname = filename.replace('.txt', '_top_worte.csv')
            csv_pfad = os.path.join(target_folder, csv_dateiname)

            with open(csv_pfad, 'w', newline='', encoding='utf-8') as csv_datei:
                csv_schreiber = csv.writer(csv_datei)
                csv_schreiber.writerow(['Wort', 'Anzahl'])
                for wort, anzahl in top_worte_liste:
                    csv_schreiber.writerow([wort, anzahl])


ordner_pfad = '../1 data_preprocessing/output'
folder(ordner_pfad)

# Copy folder into react frontend src folder so that react can access the data
shutil.copytree('./top_words', '../../frontend/src/pages/charts/data/top_words', dirs_exist_ok=True)