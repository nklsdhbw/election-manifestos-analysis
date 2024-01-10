import os
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, classification_report
import matplotlib.pyplot as plt

# Die vordefinierten Labels/Themen
labels = ['Wirtschaft', 'Technologie', 'Gesundheit', 'Umwelt', 'Politik']  

# Erstellen eines DataFrames zur Simulation gelabelter Daten
# Dieser Schritt würde manuelles Labeln erfordern, um ein Anfangsset für das Training zu erstellen
# Hier simulieren wir diesen Schritt mit einem Dummy-DataFrame
# In der Praxis müssten Sie Texte mit ihren tatsächlichen Labels bereitstellen

# Beispiel-Daten
data = [
    ('Die Inflation hat in diesem Jahr einen neuen Höhepunkt erreicht, was zu steigenden Preisen führt', 'Wirtschaft'),
    ('Die neuesten Trends in der KI-Technologie revolutionieren die Art und Weise, wie wir mit Maschinen interagieren', 'Technologie'),
    ('Immer mehr Menschen wählen pflanzliche Ernährung für eine bessere Gesundheit und Umwelt', 'Gesundheit'),
    ('Die politischen Spannungen in der Region haben zu diplomatischen Verhandlungen geführt', 'Politik'),
    ('Die Auswirkungen des Klimawandels werden immer sichtbarer, insbesondere in Küstenregionen', 'Umwelt'),
    ('Innovative medizinische Behandlungen versprechen neue Hoffnung für chronische Krankheiten', 'Gesundheit'),
    ('Die Finanzmärkte zeigen nach dem jüngsten Börsencrash Anzeichen einer Erholung', 'Wirtschaft'),
    ('Die neuesten Smartphones bieten eine beeindruckende Palette von Funktionen und Verbesserungen', 'Technologie'),
    ('Wahlrechtsreformen werden diskutiert, um faire und transparente Wahlen zu gewährleisten', 'Politik'),
    ('Umweltaktivisten rufen zu dringenden Maßnahmen gegen die globale Erwärmung auf', 'Umwelt')
]


df = pd.DataFrame(data, columns=['text', 'label'])

# Textdaten vorbereiten
tfidf_vectorizer = TfidfVectorizer(max_features=5000)
X = tfidf_vectorizer.fit_transform(df['text'])

# Label kodieren
label_encoder = LabelEncoder()
y = label_encoder.fit_transform(df['label'])

# Trainings- und Testset erstellen
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Klassifikationsmodell erstellen und trainieren
classifier = MultinomialNB()
classifier.fit(X_train, y_train)

# Modell evaluieren
y_pred = classifier.predict(X_test)

# Hier entfernen wir target_names, damit classification_report automatisch die richtigen Namen verwendet
print(classification_report(y_test, y_pred, target_names=label_encoder.classes_))

# Texte aus dem "summary_output"-Ordner klassifizieren
extracted_text_directory = './summary_output'
text_counts = {label: 0 for label in labels}

for filename in os.listdir(extracted_text_directory):
    if filename.endswith('.txt'):
        file_path = os.path.join(extracted_text_directory, filename)
        with open(file_path, 'r', encoding='utf-8') as file:
            text = file.read()
            text_vectorized = tfidf_vectorizer.transform([text])
            predicted_label = label_encoder.inverse_transform(classifier.predict(text_vectorized))[0]
            text_counts[predicted_label] += 1

# Balkendiagramm der Textverteilung nach Label
plt.bar(text_counts.keys(), text_counts.values())
plt.xlabel('Labels')
plt.ylabel('Anzahl der Texte')
plt.title('Verteilung der Texte nach Label')
plt.show()
