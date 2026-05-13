from fastapi import FastAPI
from pydantic import BaseModel
from llama_cpp import Llama

app = FastAPI()

 
llm = Llama(model_path="./models/smollm2-135m-instruct-q8_0.gguf", n_ctx=1024)

class JobData(BaseModel):
    description: str

@app.post("/analyze")
async def analyze(data: JobData):
    prompt = f"<|im_start|>user\nExtrait les 3 compétences techniques majeures de cette offre : {data.description}<|im_end|>\n<|im_start|>assistant\n"
    
    output = llm(prompt, max_tokens=50)
    return {"analysis": output["choices"][0]["text"]}

@app.post("/summarize")
async def summarize(data: JobData):
    prompt = f"<|im_start|>user\nRésume cette offre d'emploi en une seule phrase courte et percutante : {data.description[:800]}<|im_end|>\n<|im_start|>assistant\nRésumé :"
    
    output = llm(prompt, max_tokens=60, stop=["<|im_end|>"])
    return {"summary": output["choices"][0]["text"].strip()}