# TODO: Komplett überarbeiten, da die ausgegebene Grafik noch komplett leer ist :(

# import spacy
# from spacy.util import minibatch
# from spacy.training.example import Example
# import random
# import matplotlib.pyplot as plt
# import os

# # load spaCy model
# nlp = spacy.load('de_core_news_sm')

# # add text classification to the pipeline
# if 'textcat_multilabel' not in nlp.pipe_names:
#     textcat = nlp.add_pipe('textcat_multilabel')
# else:
#     textcat = nlp.get_pipe('textcat_multilabel')

# # definition of the labels
# labels = ["Politik", "Wirtschaft", "Umwelt"]
# for label in labels:
#     textcat.add_label(label)

# # read the text files and add them to the list
# train_data = []
# file_path = './politischer_text.txt'
# with open(file_path, 'r', encoding='utf-8') as file:
#     lines = file.readlines()

#     for i in range(0, len(lines), 2):
#         text = lines[i].strip()
#         text_labels = lines[i + 1].strip().split(', ')
#         cats = {label: label in text_labels for label in labels}
#         train_data.append((text, {"cats": cats}))

# # train model
# optimizer = nlp.begin_training()
# for i in range(10):
#     random.shuffle(train_data)
#     losses = {}
#     for batch in minibatch(train_data, size=2):
#         for text, annotations in batch:
#             doc = nlp.make_doc(text)
#             example = Example.from_dict(doc, annotations)
#             nlp.update([example], drop=0.5, losses=losses)
#     print(f"Losses at iteration {i}: {losses}")

# # classify the extracted texts
# extracted_text_directory = './summary_output'
# classified_texts = {label: [] for label in labels}

# for filename in os.listdir(extracted_text_directory):
#     if filename.endswith('.txt'):
#         file_path = os.path.join(extracted_text_directory, filename)
#         with open(file_path, 'r', encoding='utf-8') as file:
#             text = file.read()
#             doc = nlp(text)
#             for label, score in doc.cats.items():
#                 if score > 0.5:
#                     classified_texts[label].append(filename)

# # visualize the classification
# counts = {label: len(files) for label, files in classified_texts.items()}
# plt.bar(counts.keys(), counts.values())
# plt.xlabel('Labels')
# plt.ylabel('Anzahl der Texte')
# plt.title('Klassifizierung der Texte nach Label')
# plt.show()

# # optional: save the model
# # nlp.to_disk("/path/to/saved_model")
