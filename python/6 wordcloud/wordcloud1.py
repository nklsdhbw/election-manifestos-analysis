from wordcloud import WordCloud
import matplotlib.pyplot as plt
import os

def create_wordclouds():
    source_folder = '../5 top words/top_words'
    target_folder = './'

    if not os.path.exists(target_folder):
        os.makedirs(target_folder)

    for filename in os.listdir(source_folder):
        if filename.endswith('.csv'):
            file_path = os.path.join(source_folder, filename)
            frequencies = {}

            with open(file_path, 'r') as file:
                lines = file.readlines()
                for line in lines:
                    parts = line.strip().split(',')
                    if parts[0] != 'Wort':
                        word = parts[0]
                        count = int(parts[1])
                        frequencies[word] = count

            wordcloud = WordCloud(
                width=1920, 
                height=1080, 
                background_color='white',
                scale=3
            ).generate_from_frequencies(frequencies)

            plt.figure(figsize=(19.2, 10.8))
            plt.imshow(wordcloud, interpolation="bilinear")
            plt.axis("off")

            svg_filename = filename.replace('.csv', '.svg')
            svg_path = os.path.join(target_folder, svg_filename)
            plt.savefig(svg_path, format='svg', bbox_inches='tight')

            plt.close()

create_wordclouds()
