# Utilise une image Python légère
FROM python:3.9-slim

# ÉTAPE CRUCIALE : Installer les outils de compilation pour llama-cpp
RUN apt-get update && apt-get install -y \
    build-essential \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copier le fichier de dépendances
COPY requirements.txt .

# Lancer l'installation des libs
RUN pip install --no-cache-dir -r requirements.txt

# Copier le reste du code et le modèle
COPY ./models /app/models
COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]