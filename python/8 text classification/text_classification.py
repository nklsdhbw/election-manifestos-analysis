import spacy
from spacy.util import minibatch
from spacy.training.example import Example
import random
import os
import csv
import json
import shutil

# path where the trained model should be saved
model_dir = './trained_model'

# load the german spaCy model
nlp = spacy.load('de_core_news_sm')

# add the text classifier to the pipeline if it doesn't exist
if 'textcat_multilabel' not in nlp.pipe_names:
    textcat = nlp.add_pipe('textcat_multilabel')
else:
    textcat = nlp.get_pipe('textcat_multilabel')

# define the labels
labels = {"Umwelt", "Bildung", "Gesundheit", "Wirtschaft"}

# proof if model already exists
if os.path.exists(model_dir):
    nlp = spacy.load(model_dir)
else:
    for label in labels:
        textcat.add_label(label)

    # path to the json file with the training data
    file_path = './modified_training_data.json'

    # read the training data
    with open(file_path, 'r', encoding='utf-8') as file:
        train_data = json.load(file)

    # train the model
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

    # save the trained model
    nlp.to_disk(model_dir)

# directory with the extracted text files
extracted_text_directory = '../1 data_preprocessing/output'
output_folder = './labels'
os.makedirs(output_folder, exist_ok=True)
allParties = "Party,Label,Percentage\n"

# classify the text files
for filename in os.listdir(extracted_text_directory):
    print("Start processing files")
    counterUmwelt = 0
    counterBildung = 0
    counterGesundheit = 0
    counterWirtschaft = 0
    if filename.endswith('.txt'):
        file_path = os.path.join(extracted_text_directory, filename)
        with open(file_path, 'r', encoding='utf-8') as file:
            text = file.read()
            texts = text.split(". ")
            countSentences = len(texts)
            for text in texts:
                doc = nlp(text)
                scores = {label: doc.cats[label] for label in labels}
                max_label = max(scores, key=scores.get)
                if max_label == "Umwelt":
                    counterUmwelt += 1
                if max_label == "Bildung":
                    counterBildung += 1
                if max_label == "Gesundheit":
                    counterGesundheit += 1
                if max_label == "Wirtschaft":
                    counterWirtschaft += 1

            csv_file_path = os.path.join(output_folder, filename.replace('.txt', '.csv'))
            with open(csv_file_path, 'w', newline='', encoding='utf-8') as csvfile:
                text = "Label,Percentage\n"
                for column, counter in zip(["Bildung", "Wirtschaft", "Gesundheit", "Umwelt"], [counterBildung, counterWirtschaft, counterGesundheit, counterUmwelt]):
                    text += column + "," + str(round(((counter / countSentences) * 100), 2)) + "\n"
                    allParties += filename.replace('.txt', '') + "," + column + "," + str(round(((counter / countSentences) * 100), 2)) + "\n"
                text = text[:-1]
                csvfile.write(text)

# write the results to a csv file
csv_file_path = os.path.join(output_folder, 'classification_results.csv')
with open(csv_file_path, 'w', newline='', encoding='utf-8') as csvfile:
    allParties = allParties[:-1]
    csvfile.write(allParties)

# copy the folder to the frontend
shutil.copytree('./labels', '../../frontend/src/pages/charts/data/labels', dirs_exist_ok=True)