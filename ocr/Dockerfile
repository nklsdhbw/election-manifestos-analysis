FROM ubuntu:20.04

RUN apt-get update && \
    apt-get install -y tesseract-ocr

COPY deu.traineddata /usr/share/tesseract-ocr/4.00/tessdata/
CMD ["/bin/bash"]
