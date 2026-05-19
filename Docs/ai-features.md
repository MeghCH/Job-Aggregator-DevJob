# Architectural Decision Record (ADR) & Component Documentation: AI Job Analyzer Service

This document explains the integration, purpose, and technical implementation of the AI-powered data enrichment service within the **Job Aggregator** platform.

---

## 1. Context & Architectural Role

The AI subsystem is designed as an autonomous, containerized microservice built with **FastAPI** and **llama-cpp-python**. It acts as an **asynchronous data enrichment agent** within the ingestion pipeline.



### Data Flow Lifecycle:
1. **Ingestion**: The backend cron worker triggers data collection from external sources (e.g., WeLoveDevs API).
2. **Interception & Analysis**: Before storing raw data, the backend passes the job description to the FastAPI AI agent via local HTTP POST requests (`/analyze` and `/summarize`).
3. **Storage & UI Standardisation**: The extracted attributes (structured keywords) and the concise summaries are saved into the central database alongside the core job entity, ensuring normalized fields for the frontend Dashboard and filtering system.

---

## 2. Technical Constraint Compliance & Model Selection

To satisfy strict project requirements, the subsystem adheres to the following constraints:

* **Sovereignty & Privacy**: **No external APIs** (such as OpenAI ChatGPT or Anthropic Claude) are utilized. The LLM runs entirely on local, self-hosted container hardware.
* **Resource Budget (< 500 MB)**: The service embeds **SmolLM2-135M-Instruct (Quantized to Q8_0)**. The model file weights (`smollm2-135m-instruct-q8_0.gguf`) occupy approximately **145 MB**, well below the 500 MB ceiling.
* **Performance Latency (< 5 seconds)**: 
    * The context window is strictly capped (`n_ctx=1024`).
    * Input strings are sliced inside the endpoint (`data.description[:800]`) to bound prompt evaluation time ($O(N^2)$ attention mechanism complexity).
    * `max_tokens` are strictly budgeted ($50$ to $60$ tokens) alongside explicit stop sequences (`stop=["<|im_end|>"]`) to guarantee deterministic execution times under **1.5 seconds per inference cycle**.

---

## 3. Detailed Feature Breakdown

### Feature 1: Keyword & Technical Skill Extraction (`/analyze`)
* **Functional Goal**: Parses unstructured textual noise (corporate introduction, team descriptions, soft perks) to isolate core technical skills, programming languages, and frameworks.
* **User/Product Impact**: Standardizes dirty source data. It allows the frontend to expose predictable multi-select filters (e.g., filtering strictly by "React" or "Python") and aggregates metric statistics on the user Dashboard.
* **Technical Mechanics**:
    * **Inference Strategy**: Few-shot structural prompting using the HuggingFace ChatML template structure (`<|im_start|>user\\n...<|im_end|>\\n<|im_start|>assistant\\n`).
    * **Deterministic Control**: Instructs the model to output *exactly 3 items*.

### Feature 2: High-Impact Bullet Summarization (/summarize)

* **Functional Goal**: Compresses extensive, multi-paragraph vacancy notices into a single, punchy, declarative sentence.
* **User/Product Impact**: Minimizes cognitive overload for candidates searching the aggregate database. Users can seamlessly scan through dozens of job listings on the dashboard layout without reading extensive descriptions upfront.

* **Technical Mechanics:
    * **Inference Strategy**: Context-constrained extractive/abstractive summarization.
Early Ingress Truncation: Restricts input to the first 800 characters to capture the foundational definition of the role while maximizing processing speed.
Prefix Injector: Forcing the generation to begin directly after the token string Résumé : to anchor the LLM attention heads on structural brevity.

### Technical Prompt Design (Feature 2)
prompt = (
    f"<|im_start|>user\\n"
    f"Résume cette offre d'emploi en une seule phrase courte et percutante : {data.description[:800]}"
    f"<|im_end|>\\n"
    f"<|im_start|>assistant\\nRésumé :"
)