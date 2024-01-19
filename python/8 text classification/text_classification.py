import spacy
from spacy.util import minibatch
from spacy.training.example import Example
import random
import os
import csv
import json
import shutil

# TODO: fix the label 'Gesundheit' -> specify the training data for this label

# load the german spaCy model
nlp = spacy.load('de_core_news_sm')

# add text classification to the pipeline for multilabels
if 'textcat_multilabel' not in nlp.pipe_names:
    textcat = nlp.add_pipe('textcat_multilabel')
else:
    textcat = nlp.get_pipe('textcat_multilabel')

# path to the JSON file with the training data
file_path = './modified_training_data.json'

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
extracted_text_directory = '../1 data_preprocessing/output'
all_results = []

# classify the files in the directory
output_folder = './labels'
os.makedirs(output_folder, exist_ok=True)

for filename in os.listdir(extracted_text_directory):
    if filename.endswith('.txt'):
        file_path = os.path.join(extracted_text_directory, filename)
        with open(file_path, 'r', encoding='utf-8') as file:
            text = file.read()
            doc = nlp(text)
            scores = {label: doc.cats[label] for label in labels}

            # Add to all_results for classification_results.csv
            scores_with_filename = scores.copy()
            scores_with_filename['filename'] = filename.replace('.txt', '')
            all_results.append(scores_with_filename)

            # Creating a csv file for each text file
            csv_file_path = os.path.join(output_folder, filename.replace('.txt', '.csv'))
            with open(csv_file_path, 'w', newline='', encoding='utf-8') as csvfile:
                writer = csv.DictWriter(csvfile, fieldnames=labels)
                writer.writeheader()
                writer.writerow(scores)

# save the overall classification results in a csv file
csv_file_path = os.path.join(output_folder, 'classification_results.csv')
with open(csv_file_path, 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=['filename'] + list(labels))
    writer.writeheader()
    for result in all_results:
        writer.writerow(result)

# copy folder into react frontend src folder so that react can access the data
shutil.copytree('./labels', '../../frontend/src/pages/charts/data/labels', dirs_exist_ok=True)
