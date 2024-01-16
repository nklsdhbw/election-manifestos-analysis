####################################################################################################
# maybe visualize with a heatmap 
####################################################################################################

import os
import re
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
from nltk.corpus import stopwords
import ssl

# using SSL to download nltk (code from https://stackoverflow.com/questions/41348621/ssl-error-downloading-nltk-data)
try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context
nltk.download('stopwords')

# using nltk to remove stopwords
stop_words = set(stopwords.words('german'))

# function to read the txt files from the folder 'output'
def read_texts(folder_path):
    texts = []
    filenames = []
    for filename in os.listdir(folder_path):
        if filename.endswith('.txt'):
            file_path = os.path.join(folder_path, filename)
            with open(file_path, 'r', encoding='utf-8') as file:
                texts.append(file.read())
                filenames.append(filename)
    return filenames, texts

# function to preprocess the text and for example lower the text and remove punctuation 
def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'\W+', ' ', text)
    text = ' '.join([word for word in text.split() if word not in stop_words])
    return text

# function to calculate the similarity between the texts
def calculate_similarity(texts):
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(texts)
    return cosine_similarity(tfidf_matrix)

folder_path = './output'
filenames, texts = read_texts(folder_path)
processed_texts = [preprocess_text(text) for text in texts]

similarity_matrix = calculate_similarity(processed_texts)

df = pd.DataFrame(similarity_matrix, index=filenames, columns=filenames)

target_folder = './similarity_output'
if not os.path.exists(target_folder):
    os.makedirs(target_folder)

csv_filename = os.path.join(target_folder, 'similarity_analysis.csv')
df.to_csv(csv_filename, index=True)