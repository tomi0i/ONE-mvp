from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import os
from openai import AsyncOpenAI
from dotenv import load_dotenv
MODEL_NAME = os.getenv("OPENAI_MODEL", "gpt-4o-mini-2024-07-18")

app = FastAPI(title="MVP Builder API", version="0.1.0")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # フロントの URL
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["*"],
)
class Idea(BaseModel):
    idea: str

@app.get("/")
def read_root():
    return {"status": "ok"}



load_dotenv()                             # .env を読み込む
client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
# --------------------------------------------------------------

@app.post("/generate")
async def generate_code(idea: Idea):
    """
    フロントから渡された 'idea' を元に GPT‑4o がコードを生成し、
    そのコードブロックを文字列として返すエンドポイント
    """
    prompt = (
        "You are a senior Python engineer. "
        "Respond only with a valid code block that implements the following requirement:\n"
        f"{idea.idea}"
    )

    chat = await client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {"role": "system", "content": "Output strictly one code block and nothing else."},
            {"role": "user", "content": prompt},
        ],
        max_tokens=400,
        temperature=0.2,
    )
    code_block = chat.choices[0].message.content
    return {"message": code_block}