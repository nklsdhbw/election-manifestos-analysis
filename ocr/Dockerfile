# Use the official Ubuntu 20.04 image as the base image
FROM ubuntu:20.04

# Update the package index and install tesseract-ocr
RUN apt-get update && \
    apt-get install -y tesseract-ocr

# Copy your traineddata file to the tessdata directory
COPY deu.traineddata /usr/share/tesseract-ocr/4.00/tessdata/

# Add Tesseract to the system's PATH
RUN echo 'export PATH="/usr/share/tesseract-ocr/4.00:${PATH}"' >> ~/.bashrc

# Specify the default command to run when the container starts
CMD ["/bin/bash"]
