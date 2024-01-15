FROM python:3.12-slim as base

# Install necessary dependencies, including Poppler, OpenGL libraries, and GLib
RUN apt-get update \
    && apt-get install -y tesseract-ocr poppler-utils libgl1-mesa-glx libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app
COPY deu.traineddata /usr/share/tesseract-ocr/4.00/tessdata/
# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Change working directory to data_preprocessing
WORKDIR ./data_preprocessing

# Make port 80 available to the world outside this container
EXPOSE 80


CMD ["python", "extract_tex_and_export.py"]
