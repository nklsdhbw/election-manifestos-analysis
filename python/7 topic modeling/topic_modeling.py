import os
from sklearn.decomposition import LatentDirichletAllocation
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import PCA
import numpy as np
import pandas as pd
from nltk.corpus import stopwords
import shutil
import chardet
import nltk
import ssl

# using SSL to download nltk
try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context
nltk.download('stopwords')

# definition of the directory where the extracted text files are stored
extracted_text_directory = '../1 data_preprocessing/output'

docs = []

# read the extracted text files and store them in a list
for text_file in os.listdir(extracted_text_directory):
    if text_file.endswith('.txt'):
        file_path = os.path.join(extracted_text_directory, text_file)
        
        # read the file in binary mode to detect encoding
        with open(file_path, 'rb') as file:
            raw_data = file.read()
            result = chardet.detect(raw_data)
            encoding = result['encoding']
            
        # now read the file with the detected encoding
        with open(file_path, 'r', encoding=encoding) as file:
            text = file.read()
            docs.append(text)

# define German stopwords
german_stopwords = stopwords.words('german')

# vectorisation of the text
vectorizer = CountVectorizer(stop_words=german_stopwords)
X = vectorizer.fit_transform(docs)

# fit the LDA model using 6 topics (can be changed)
lda = LatentDirichletAllocation(n_components=6, random_state=0)
lda.fit(X)

# compuation of the average topic weights
topic_weights = lda.transform(X)
average_topic_weights = np.mean(topic_weights, axis=0)

# create df and save it as csv
topic_df = pd.DataFrame({
    'Thema': [f'Thema {i+1}' for i in range(len(average_topic_weights))],
    'Durchschnittlicher_Anteil': average_topic_weights
})
topic_df.to_csv('durchschnittliche_themenanteile.csv', index=False)


# aggregate words per topic for each document
n_top_words = 10  # Number of top words per topic

for i, party in enumerate(os.listdir('../1 data_preprocessing/inputPDFs')):
    party = os.path.splitext(party)[0] # Get file name without extension
    topic_word_distributions = lda.components_
    
    # create a DataFrame to store top words for all topics
    all_topics_df = pd.DataFrame()

    for topic_idx, topic_distribution in enumerate(topic_word_distributions):
        top_word_indices = topic_distribution.argsort()[-n_top_words:][::-1]
        top_words = [(vectorizer.get_feature_names_out()[i], topic_distribution[i]) for i in top_word_indices]
        topic_df = pd.DataFrame(top_words, columns=[f'Topic_{topic_idx+1}_Word', f'Topic_{topic_idx+1}_Frequency'])
        all_topics_df = pd.concat([all_topics_df, topic_df], axis=1)

    all_topics_df.to_csv(f'./topics/{party}_all_topics.csv', index=False)

# copy folders into the React frontend src folder so that React can access the data
shutil.copytree('./topics', '../../frontend/src/pages/charts/data/topics', dirs_exist_ok=True)
shutil.copytree('./PCA', '../../frontend/src/pages/charts/data/PCA', dirs_exist_ok=True)