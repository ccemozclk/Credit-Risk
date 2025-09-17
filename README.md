# End-to-End Credit Risk Prediction & Interactive EDA Platform

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Python](https://img.shields.io/badge/python-3.9-blue.svg)
![Django](https://img.shields.io/badge/django-5.2-green.svg)
![Docker](https://img.shields.io/badge/docker-containerized-blue.svg)

A comprehensive, end-to-end machine learning project that predicts credit default risk. This repository contains not only a predictive model but also an interactive web-based platform for Exploratory Data Analysis (EDA), built with Django and containerized with Docker.

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Installation and Setup](#installation-and-setup)
- [Project Structure](#project-structure)
- [Dataset](#dataset)
- [Model Performance](#model-performance)
- [License](#license)
- [Contact](#contact)

## Project Overview

In this project, a comprehensive machine learning solution was developed to predict credit risk, one of the most critical areas in the financial sector. The project was executed on the publicly available Lending Club dataset and encompasses the entire workflow, from raw data processing to an interactive web application delivered to the end-user.

The core of the project involves training and comparing several classification models, with a primary focus on XGBoost Classifier. A key deliverable is the transformation of static data analysis from a Jupyter Notebook into a dynamic, interactive web dashboard where users can explore various data visualizations. The entire application is containerized using Docker for easy deployment and scalability.

## Key Features

- **Interactive EDA Dashboard:** A web-based interface built with Django and JavaScript to visualize key insights and data relationships from the dataset.
- **Predictive Modeling:** Utilizes XGBoost Classifier and other models to predict the probability of a loan being 'Charged Off'.
- **End-to-End Pipeline:** Covers the complete project lifecycle from data exploration and feature engineering to model training and deployment.
- **Dockerized Application:** The entire project is containerized, allowing for a seamless and consistent setup across different environments.

## Screenshots

*Main Dashboard*
![Dashboard Screenshot](path/to/your/screenshot1.png)

*Model Prediction Page*
![Prediction Screenshot](path/to/your/screenshot2.png)

## Tech Stack

- **Backend:** Python, Django
- **Frontend:** JavaScript, HTML, CSS
- **Data Science & ML:** Pandas, NumPy, Scikit-learn, XGBoost, CatBoost
- **Deployment:** Docker, Docker Compose

## Installation and Setup

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/products/docker-desktop/) & [Docker Compose](https://docs.docker.com/compose/install/)

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name
```

### 2. Run with Docker (Recommended)

The easiest way to run the application is by using Docker Compose. This will build the necessary images and run the containers.

```bash
docker-compose up --build
```

The application will be accessible at [http://localhost:8000](http://localhost:8000).

### 3. Local Setup (Without Docker)

If you prefer to run the application locally without Docker:

1.  **Create and activate a virtual environment:**
    ```bash
    python -m venv venv
    # On Windows
    .\venv\Scripts\activate
    # On macOS/Linux
    source venv/bin/activate
    ```

2.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

3.  **Run Django migrations:**
    ```bash
    python manage.py migrate
    ```

4.  **Start the development server:**
    ```bash
    python manage.py runserver
    ```
    The application will be accessible at [http://localhost:8000](http://localhost:8000).

## Project Structure

```
.
├── artifacts/
│   ├── model.pkl
│   ├── preprocessor.pkl
│   ├── raw_data.csv
│   ├── test.csv
│   └── train.csv
├── logs/
│   └── ... (Log files from different runs)
├── notebooks/
│   └── research.ipynb
├── src/
│   ├── CreditRiskPrediction/
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── components/
│   │   ├── __init__.py
│   │   ├── data_ingestion.py
│   │   ├── data_transformation.py
│   │   ├── model_evaluation.py
│   │   └── model_trainer.py
│   ├── pipeline/
│   │   ├── __init__.py
│   │   ├── prediction_pipeline.py
│   │   └── training_pipeline.py
│   ├── utils/
│   │   ├── __init__.py
│   │   └── utils.py
│   ├── __init__.py
│   ├── constants.py
│   ├── entity.py
│   ├── exception.py
│   └── logger.py
├── templates/
│   ├── home.html
│   └── results.html
├── .dockerignore
├── .gitignore
├── db.sqlite3
├── Dockerfile
├── manage.py
├── requirements.txt
└── setup.py
```

## Dataset

The project uses the **Lending Club Loan Data** dataset. It contains complete loan data for all loans issued through 2007-2011, including the current loan status (Current, Late, Fully Paid, etc.) and latest payment information.

The dataset can be found on [Kaggle](https://www.kaggle.com/datasets/wendykan/lending-club-loan-data).

## Model Performance

The XGBoost model was selected as the final model based on its performance on the test set, with F1-Score being the primary metric due to the class imbalance in the dataset.

- **F1-Score: 63%**
- **Accuracy:** 83.35%
- **Precision:** 55.66%
- **Recall:** 74.17%

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

Cem OZCELIK - [i.cemozcelik@gmail.com](mailto:i.cemozcelik@gmail.com)

Project Link: [https://github.com/your-username/your-repo-name](https://github.com/your-username/your-repo-name)
