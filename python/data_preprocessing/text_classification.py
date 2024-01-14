import spacy
from spacy.util import minibatch
from spacy.training.example import Example
import random
import os
import csv
import json

# load the german spaCy model
nlp = spacy.load('de_core_news_sm')

# add text classification to the pipeline for multilabels
if 'textcat_multilabel' not in nlp.pipe_names:
    textcat = nlp.add_pipe('textcat_multilabel')
else:
    textcat = nlp.get_pipe('textcat_multilabel')

# path to the JSON file with the training data
file_path = './formatted_training_data.json'

# read the training data from the JSON file
with open(file_path, 'r', encoding='utf-8') as file:
    train_data = json.load(file)

# add the labels to the text classifier, labels are read from the training data
labels = set()
for _, annotations in train_data:
    labels.update(annotations['cats'].keys())
for label in labels:
    textcat.add_label(label)

# train the spaCy model with the training data
optimizer = nlp.begin_training()
for i in range(10):
    random.shuffle(train_data)
    losses = {}
    for batch in minibatch(train_data, size=2):
        for text, annotations in batch:
            doc = nlp.make_doc(text)
            example = Example.from_dict(doc, annotations)
            nlp.update([example], drop=0.2, losses=losses)
    print(f"Losses at iteration {i}: {losses}")

# directory with the files to be classified
extracted_text_directory = './output'
results = []

# classify the files in the directory
for filename in os.listdir(extracted_text_directory):
    if filename.endswith('.txt'):
        file_path = os.path.join(extracted_text_directory, filename)
        with open(file_path, 'r', encoding='utf-8') as file:
            text = file.read()
            doc = nlp(text)
            scores = {label: doc.cats[label] for label in labels}
            filename_without_extension, _ = os.path.splitext(filename)
            scores['filename'] = filename_without_extension
            results.append(scores)

# save the results in a csv file in a separate folder 'label_results'
output_folder = './label_results'
os.makedirs(output_folder, exist_ok=True)
csv_file_path = os.path.join(output_folder, 'classification_results.csv')

with open(csv_file_path, 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=['filename'] + list(labels))
    writer.writeheader()
    for result in results:
        writer.writerow(result)