import spacy
import os
from spacy.util import minibatch
from spacy.training.example import Example
import random
import matplotlib.pyplot as plt

# load spaCy model
nlp = spacy.load('de_core_news_sm')

# add text classification to the pipeline
textcat = nlp.add_pipe('textcat')

# definiton of the labels
labels = ["Politik", "Wirtschaft", "Umwelt"]
for label in labels:
    textcat.add_label(label)

# empty list to store the training data
train_data = []

# read the text files and add them to the list
file_path = './politischer_text.txt'
with open(file_path, 'r', encoding='utf-8') as file:
    politischer_text = file.read()
    # TODO: multi label is needed here
train_data.append((politischer_text, {"cats": {"Politik": True, "Wirtschaft": True, "Umwelt": True}})) 

# train model
optimizer = nlp.begin_training()
for i in range(10):
    random.shuffle(train_data)
    losses = {}
    for batch in minibatch(train_data, size=8):
        for text, annotations in batch:
            doc = nlp.make_doc(text)
            example = Example.from_dict(doc, annotations)
            nlp.update([example], drop=0.5, losses=losses)
    print(f"Losses at iteration {i}: {losses}")

# classify the extracted texts
extracted_text_directory = './summary_output'
classified_texts = {label: 0 for label in labels}

for filename in os.listdir(extracted_text_directory):
    if filename.endswith('.txt'):
        file_path = os.path.join(extracted_text_directory, filename)
        with open(file_path, 'r', encoding='utf-8') as file:
            text = file.read()
            doc = nlp(text)
            max_label = max(doc.cats, key=lambda label: doc.cats[label])
            if doc.cats[max_label] > 0.5:
                classified_texts[max_label] += 1

# visualize the classification
# for now just a simple chart with matlpotlib 
plt.bar(classified_texts.keys(), classified_texts.values())
plt.xlabel('Labels')
plt.ylabel('Anzahl der Texte')
plt.title('Klassifizierung der Texte nach Label')
plt.show()

# optinal: save the model
# nlp.to_disk("/path/to/saved_model")