import os
from sklearn.decomposition import LatentDirichletAllocation
from sklearn.feature_extraction.text import CountVectorizer
import numpy as np
import pyLDAvis
from IPython.display import HTML, display
import chardet
import nltk
import ssl

# using SSL to download nltk (code from https://stackoverflow.com/questions/41348621/ssl-error-downloading-nltk-data)
try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context
nltk.download('stopwords')
from nltk.corpus import stopwords


# definiton of the directory where the extracted text files are stored
extracted_text_directory = './summary_output'

# list to store the extracted text files
extracted_text_files = []

# iteration through the extracted text files
for filename in os.listdir(extracted_text_directory):
    if filename.endswith('.txt'):
        extracted_text_files.append(filename)


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

# define german stopwords
german_stopwords = stopwords.words('german')

# vectorisation of the text 
vectorizer = CountVectorizer(stop_words=german_stopwords)
X = vectorizer.fit_transform(docs)

# fit the LDA model using 4 topics (can be changed)
lda = LatentDirichletAllocation(n_components=4, random_state=0)
lda.fit(X)

# showing the top words of each topic
def print_top_words(model, feature_names, n_top_words):
    for topic_idx, topic in enumerate(model.components_):
        top_topic = "Thema #%d: " % topic_idx
        top_topic += " ".join([feature_names[i]
                             for i in topic.argsort()[-10:]])
        print(top_topic)

print_top_words(lda, vectorizer.get_feature_names_out(), 5)

# apply LDA model to the vectorized text
doc_topic_dist = lda.transform(X)

# extracting the vocabulary and the term frequency
vocab = vectorizer.get_feature_names_out()
term_frequency = np.asarray(X.sum(axis=0)).ravel()

panel = pyLDAvis.prepare(topic_term_dists=lda.components_, doc_topic_dists=doc_topic_dist,
                         doc_lengths=np.sum(X, axis=1).A1, vocab=vocab, term_frequency=term_frequency)

# visualizing the topics with pyLDAvis
pyLDAvis_display = pyLDAvis.display(panel)

# compute necessary elements for the visualization
doc_topic_dist = lda.transform(X)
topic_term_dists = lda.components_
doc_lengths = np.sum(X, axis=1).A1
vocab = vectorizer.get_feature_names_out()
term_frequency = np.asarray(X.sum(axis=0)).ravel()

# prepare the data for the visualization
prepared_data = pyLDAvis.prepare(
    topic_term_dists=lda.components_, 
    doc_topic_dists=doc_topic_dist, 
    doc_lengths=np.sum(X, axis=1).A1, 
    vocab=vocab, 
    term_frequency=term_frequency
)
# save the visualization as html file to show the results
pyLDAvis.save_html(prepared_data, 'LDA_Visualization.html')
