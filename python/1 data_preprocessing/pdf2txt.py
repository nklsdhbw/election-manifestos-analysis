from PyPDF2 import PdfReader
import re
import os

PDF_DIRECTORY = "./inputPDFs/"
# list filenames of all pdfs
pdfs = os.listdir(PDF_DIRECTORY)
pdfs = [pdf for pdf in pdfs if not pdf.startswith(".DS_Store")]
for pdf in pdfs:
    # extract filename without extension
    party = pdf.split(".")[0]
    reader = PdfReader(PDF_DIRECTORY + pdf)
    pages = reader.pages
    raw_text = ""
    lineNumber = 0
    clearedTexts = []
    meltPart1 = ""
    for page in pages:
        text = page.extract_text()
        text = text.replace('\n', ' ')
        text = text.replace(' - ', '')
        text = text.replace(' -', '')
        text = text.replace('- ', '')
        # remove whitespaces
        text = " ".join(text.split())
        # remove gender stars
        text = text.replace('*', '')
        #*
        if pdf == "DIE_GRUENEN.pdf":
        # remove this string Bundestagswahlprogramm 2021 BÜNDNIS 90 / DIE GRÜNEN 258, the number can differ
            text = re.sub(r'Bundestagswahlprogramm \d+ BÜNDNIS 90 / DIE GRÜNEN \d+', '', text)
            raw_text += text
        # search for KAPITEL x, where x is a one or two digit number and extract text before it including the number
    
        pattern = r'(.+KAPITEL \d+)'
        # Search for the pattern in the text
        if pdf == "AFD.pdf":
            match = re.search(pattern, text)
            if match:
                chapter_name = match.group(1)
                match = re.search(r'KAPITEL \d+', text)
                chapterString = match.group(0)
                chapterName = chapter_name.replace(chapterString, "")
            
            # remove "20 Demokratie und Rechtsstaat", the number at the beginning can differ
            text = re.sub(rf'{chapterName} \d+ ', '', text)
            text = re.sub(rf'\d+ {chapterName}', '', text)
            text = re.sub(rf'\s*\d+{chapterString}', '', text)
            text = re.sub(rf'{chapterString}\s*\d+', '', text)
            text = text.replace(chapterName, '')
            raw_text += text
        

        if pdf == "CDU-CSU.pdf":
            text = re.sub(r'Seite \d+ von \d+', '', text)
            #digit_list = [int(match) for match in re.findall(r'\d+', text)]
            text = text.split(" ")
            cleared_text = []
            indexes = []
            for word in text:
                if meltPart1 != "":
                    word = meltPart1 + word
                    word = word.replace("-", "")
                    meltPart1 = ""
                index = 0
                digits = [int(match) for match in re.findall(r'\d+', word)]
                # Extract all digits from the word
                # Check if digit is equal to the line number
                # if yes the digit equals the line number and has to be removed
                for digit in digits:
                    # Sonderlocke CO21477
                    if digit == 21477:
                        word = "CO2"
                        lineNumber += 1

                    if digit == lineNumber:
                        lineNumber += 1
                        strDigit = f"{digit}"

                        # e.g. konventio1881 
                        if strDigit != word:
                            words = [element for element in text if strDigit in element]
                            words = words[0]
                            index = text.index(words)
                          
                            indexes.append(index)
                            word = word.replace(strDigit, '')

                    if digit == lineNumber+1:
                        lineNumber += 1
                        strDigit = f"{digit}"

                        # e.g. konventio1881 
                        if strDigit != word:
                            words = [element for element in text if strDigit in element]
                            words = words[0]
                            index = text.index(words)
                            
                            indexes.append(index)
                            word = word.replace(strDigit, '')
                        word = word.replace(strDigit, '')
                cleared_text.append(word)
                # remove all "" from list
                
                # join list to string

            indexDecrease = 0
            for index in indexes:
                index -= indexDecrease

                # len = 50
                # melt e.g index12 and 13
                # -> index 14 is now index 13
                if index != len(cleared_text)-1:
                    cleared_text[index] = cleared_text[index] + cleared_text[index+1]
                    del cleared_text[index+1]
                    indexDecrease += 1
                # Special case: end of page is reached and word continues on next page
                else:
                    meltPart1 = cleared_text[index]
                    del cleared_text[index]
            cleared_text = list(filter(None, cleared_text))
            cleared_text = " ".join(cleared_text)
            cleared_text = cleared_text.replace("•", "")
            #text = re.sub(r'\s+', ' ', text)
            raw_text += cleared_text


        if pdf == "SPD.pdf":
            text = text.replace("SPD-Parteivorstand 2021", '')
            text = text.replace("Das Zukunftsprogramm der SPD", '')
            text = re.sub(r'Kapitel \d+ Seite >\d+', '', text)
            text = re.sub(r'Kapitel \d+', '', text)
            # Replace multiple whitespaces with one whitespace
            text = re.sub(r'\s+', ' ', text)
            raw_text += text
        
        if pdf == "DIE_LINKE.pdf":
            # Find all words containing characters and numbers -> numbers are page numbers
            matches = re.findall(r'\w*\d\w*', text)
            for match in matches:
                if not match.isdigit():
                    # Remove the page number from the string like "7Einführung"
                    cleaned = re.sub(r'\d', ' ', match)
                    text = text.replace(match, cleaned)
            text = text.replace(" n ", "")
            raw_text += text

        
        if pdf == "FDP.pdf":
            pattern = r'Das Programm der Freien Demokraten zur Bundestagswahl 2021 (\d+)'
            page = re.findall(pattern, text)
            if page:
                text = text.replace(f"Das Programm der Freien Demokraten zur Bundestagswahl 2021 {page[0]}", '')
            raw_text += text

    # write text to file
    with open(f'./output/{party}.txt', 'w') as f:
        f.write(raw_text)
