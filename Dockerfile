FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./src/app/src

COPY ./artifacts/app/artifacts

EXPOSE 8000