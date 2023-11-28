from pdf2image import convert_from_path
import pytesseract
import cv2
import numpy as np
import os
import time
import concurrent.futures

### Functions
def deskew(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    gray = cv2.bitwise_not(gray)
    coords = np.column_stack(np.where(gray > 0))
    angle = cv2.minAreaRect(coords)[-1]
    
    if angle < -45:
        angle = -(90 + angle)
    else:
        angle = -angle

    (h, w) = image.shape[:2]
    center = (w // 2, h // 2)
    M = cv2.getRotationMatrix2D(center, angle, 1.0)
    rotated = cv2.warpAffine(image, M, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)

    return rotated


def extract_text_from_image(image):
    text = pytesseract.image_to_string(image)
    return text


# Simple Benchmark with 2 PDFs, future benchmarks will follow with larger pdfs
# ThreadPoolExecutor: 14 seconds
# Multiprocessing: 17 seconds
# Joblib: 18 seconds
# Normal: 21 seconds
def process_file(file):
    extracted_texts = []
    pages = convert_from_path(f"{pdf_directory}/{file}")

    # Extract party from file name
    output_file_name = file.split('.')[0]
    
    # Draw pdf pages as images and extract text
    for page in pages:
        preprocessed_image = deskew(np.array(page))
        text = extract_text_from_image(preprocessed_image)
        extracted_texts.append(text)
    
    # Write extracted text to text file
    with open(f'{output_path}/{output_file_name}.txt', 'w') as f:
        for text in extracted_texts:

            # remove all line breaks
            text = text.replace('\n', ' ')
            f.write(text)


current_directory = os.getcwd()
pdf_directory = os.path.join(current_directory, 'inputPDFs')
output_path = os.path.join(current_directory, 'output')
start_time = time.time()

# Get file names
file_names = [f for f in os.listdir(pdf_directory)]

# ThreadPoolExecutor to parallelize the process
with concurrent.futures.ThreadPoolExecutor() as executor:
    executor.map(process_file, file_names)

end_time = time.time()
print(f"Total time taken: {end_time - start_time} seconds")
print("hello")