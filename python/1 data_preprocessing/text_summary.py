# Extraktive Zusammenfassung
import os
import nltk
import chardet
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer as Summarizer
import ssl

# using SSL to download the 'punkt' package from nltk (code from https://stackoverflow.com/questions/41348621/ssl-error-downloading-nltk-data)
try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

# download the 'punkt' package from nltk
nltk.download('punkt')

# function to process the text files and identify the encoding
def process_text_file(file_path, output_path, language='german', summary_ratio=0.3): # you can change the ratio
    with open(file_path, 'rb') as file:
        raw_data = file.read()
        result = chardet.detect(raw_data)
        encoding = result['encoding']

    # define parser and summarizer
    with open(file_path, 'r', encoding=encoding) as file:
        text = file.read()
        parser = PlaintextParser.from_string(text, Tokenizer(language))
        summarizer = Summarizer()

        # compute the number of sentences in the text file to have a good ratio for the summary
        total_sentences = len(list(parser.document.sentences))
        summary_length = int(total_sentences * summary_ratio)

        # compute the summary
        summary = summarizer(parser.document, summary_length)

        # create file and ad '_summary.txt' to the name of the file
        output_file_name = os.path.splitext(os.path.basename(file_path))[0] + '_summary.txt'
        output_file_path = os.path.join(output_path, output_file_name)

        with open(output_file_path, 'w', encoding='utf-8') as output_file:
            for sentence in summary:
                output_file.write(str(sentence) + "\n")

# paths
input_path = './output'
output_path = './summary_output'

# create output directory if it does not exist
if not os.path.exists(output_path):
    os.makedirs(output_path)

# process all text files in the input directory
for file_name in os.listdir(input_path):
    if file_name.endswith('.txt'):
        process_text_file(os.path.join(input_path, file_name), output_path)