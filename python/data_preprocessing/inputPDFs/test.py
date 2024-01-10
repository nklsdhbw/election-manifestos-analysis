from PyPDF2 import PdfReader
import re
pdf = "DIE_GRUENEN.pdf"
reader = PdfReader(pdf)
pages = reader.pages
raw_text = ""
print(len(reader.pages))
lineNumber = 0
removeIndexes = []
clearedTexts = []
for page in pages[0:2]:
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
    #chapterName = ""
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
        digit_list = [int(match) for match in re.findall(r'\d+', text)]
        text = text.split(" ")
        cleared_text = []
        for word in text:
            digits = [int(match) for match in re.findall(r'\d+', word)]
            for digit in digits:
                if digit == lineNumber+1:
                    lineNumber += 1
                    # get index of word
                    strDigit = f"{digit}"
                    print(word)
                    word = word.replace(strDigit, '')
                    print(word)
                    #cleared_text.append(word)
            cleared_text.append(word)
            # remove all "" from list
            cleared_text = list(filter(None, cleared_text))
            # join list to string
        cleared_text = " ".join(cleared_text)
        raw_text += cleared_text
        #print(text)

    
    


print(raw_text)