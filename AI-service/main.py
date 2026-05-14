from fastapi import FastAPI
from pydantic import BaseModel
from llama_cpp import Llama
import re

app = FastAPI()

# Configuration optimisée pour la rapidité (< 5s par offre requis )
MODEL_PATH = "./models/SmolLM2-360M-Instruct-Q8_0.gguf"

try:
    llm = Llama(
        model_path=MODEL_PATH,
        n_ctx=1024, # Réduit pour gagner en vitesse
        n_threads=4,
        verbose=False # Moins de logs pour la clarté
    )
    print("Agent chargé avec succès !")
except Exception as e:
    print(f"Erreur lors du chargement : {e}")

class JobData(BaseModel):
    description: str

def clean_text(text: str):
    # Nettoyage HTML et limitation pour ne pas saturer le petit modèle [cite: 84]
    text = re.sub(r'<[^>]+>', '', text)
    return text.strip()[:600] 

@app.post("/analyze")
async def analyze(data: JobData):
    desc = clean_text(data.description)
    
    prompt = (
        "Instructions: Extrait les mots-clés techniques sans répétition.\n"
        "###\n"
        "Offre: Cherche dev Python, Django et Docker.\n"
        "Compétences: Python, Django, Docker\n"
        "###\n"
        f"Offre: {desc}\n"
        "Compétences:"
    )
    
    output = llm(
        prompt, 
        max_tokens=50, 
        temperature=0, 
        repeat_penalty=1.5, # Augmenté pour stopper les répétitions (ex: Python, Python...)
        stop=["###", "\n"]
    )
    
    raw_res = output["choices"][0]["text"].strip()
    
    # --- NETTOYAGE ANTI-DOUBLONS EN PYTHON ---
    # On sépare par les virgules, on enlève les espaces, et on garde les mots uniques
    keywords = [k.strip() for k in raw_res.split(",")]
    unique_keywords = list(dict.fromkeys(keywords)) # Supprime les doublons en gardant l'ordre
    
    final_res = ", ".join(unique_keywords)
    
    return {"analysis": final_res if final_res else "Non détecté"}

@app.post("/summarize")
async def summarize(data: JobData):
    desc = clean_text(data.description)
    
    # On force le modèle à identifier les points clés AVANT de rédiger
    # C'est comme une check-list mentale pour l'IA
    prompt = (
        "Instructions: Identifie le Poste, la Techno, le Lieu et l'Avantage, puis résume.\n"
        "###\n"
        "Offre: Développeur PHP chez Google à Paris, 50k, remote.\n"
        "Poste: Développeur PHP\n"
        "Lieu: Paris (Remote)\n"
        "Résumé: Ce poste est une opportunité de Développeur PHP chez Google à Paris proposant du télétravail.\n"
        "###\n"
        f"Offre: {desc}\n"
        "Poste:"
    )
    
    output = llm(
        prompt, 
        max_tokens=95, # On augmente pour lui laisser la place de "réfléchir"
        temperature=0.1, 
        stop=["###", "\n\n"],
        repeat_penalty=1.2
    )
    
    raw_text = output["choices"][0]["text"].strip()
    
    # On extrait uniquement la partie après "Résumé:" pour l'utilisateur
    if "Résumé:" in raw_text:
        res = raw_text.split("Résumé:")[1].strip()
    else:
        # Si le modèle a juste écrit la phrase directement
        res = raw_text.split("\n")[-1].replace("Résumé:", "").strip()

    return {"summary": res if res else "Résumé en cours de génération..."}