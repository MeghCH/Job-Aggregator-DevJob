from fastapi import FastAPI
from pydantic import BaseModel
from llama_cpp import Llama
from fastapi.middleware.cors import CORSMiddleware
import re

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = "./models/qwen2.5-0.5b-instruct-q5_0.gguf"

try:
    llm = Llama(
        model_path=MODEL_PATH,
        n_ctx=1024,
        n_threads=4,
        verbose=False
    )
    print("Agent chargé avec succès !")

except Exception as e:
    print(f"Erreur lors du chargement : {e}")

class JobData(BaseModel):
    description: str


def clean_text(text: str):
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()[:700]


def safe_response(text: str):
    text = text.strip()

    # Supprime caractères bizarres
    text = re.sub(r"[\n\r\t]", " ", text)

    # Supprime répétitions
    text = re.sub(r"\s+", " ", text)

    return text


@app.post("/analyze")
async def analyze(data: JobData):
    desc = clean_text(data.description)
    
    # On précise "plusieurs" et on enlève la virgule du stop pour le laisser lister
    prompt = (
        f"<|im_start|>system\nTu es un extracteur de données techniques. Extraits toutes les technologies, langages et frameworks mentionnés. Réponds uniquement par une liste séparée par des virgules.<|im_end|>\n"
        f"<|im_start|>user\nOffre : {desc}\nExtraire toutes les technos :<|im_end|>\n"
        f"<|im_start|>assistant\n"
    )

    output = llm(
        prompt,
        max_tokens=60, # On augmente un peu pour laisser de la place à plusieurs mots
        temperature=0,
        repeat_penalty=1.2,
        # IMPORTANT : On retire "," des stop sequences
        stop=["<|im_end|>", "\n\n", "Offre:"] 
    )

    res = safe_response(output["choices"][0]["text"])
    
    # On nettoie et on s'assure de récupérer chaque élément
    raw_list = res.split(",")
    technos = [t.strip().capitalize() for t in raw_list if len(t.strip()) > 1]
    
    # Supprime les doublons
    unique_technos = list(dict.fromkeys(technos))

    return {"analysis": unique_technos if unique_technos else ["Non détecté"]}


@app.post("/summarize")
async def summarize(data: JobData):
    desc = clean_text(data.description)

    # Format ChatML pour forcer le résumé en français
    prompt = (
    f"<|im_start|>system\n"
    f"You are an expert tech recruiter. Your task is to summarize job offers technically and concisely.\n"
    f"CRITICAL RULES:\n"
    f"1. You MUST respond in FRENCH.\n"
    f"2. Extract the core role, the technical stack (languages/frameworks), and the company's sector.\n"
    f"3. If the company's business sector is not mentioned, omit it completely.\n"
    f"4. If the remote policy is 'hybrid' or 'remote', you MUST use the exact word 'TÉLÉTRAVAIL'.\n"
    f"5. STRICT FORMAT: Développeur [Rôle] ([Stack]) pour [Mission].\n"
    f"6. LENGTH CONSTRAINT: Maximum 25 words. No fluff, no introductory text, get straight to the point.<|im_end|>\n"
    f"<|im_start|>user\n"
    f"Summarize this job offer technically and accurately: {desc}<|im_end|>\n"
    f"<|im_start|>assistant\n"
)

    output = llm(
        prompt,
        max_tokens=60,
        temperature=0,
        repeat_penalty=1.3,
        stop=["<|im_end|>", "\n"]
    )

    res = safe_response(output["choices"][0]["text"])
    
    # On s'assure que la phrase finit proprement
    if "." in res:
        res = res[:res.rfind(".")+1]
        
    return {"summary": "Ce poste consiste à " + res}