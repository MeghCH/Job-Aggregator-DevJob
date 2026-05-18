FROM python:3.9-slim

RUN apt-get update && apt-get install -y libgomp1 && rm -rf /var/lib/apt/lists/*


WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# On copie tout le contenu du dossier AI-service vers /app dans le conteneur
COPY . .

# On lance uvicorn en pointant vers ton fichier main.py (main:app)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]