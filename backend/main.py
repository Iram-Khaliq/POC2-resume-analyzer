from fastapi import FastAPI, UploadFile, File
from pypdf import PdfReader
from fastapi.middleware.cors import CORSMiddleware
import os
import json
from dotenv import load_dotenv
from openai import OpenAI
from pydantic import BaseModel
from typing import List
load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Education(BaseModel):
    degree: str
    institution: str
    years: str

class ResumeData(BaseModel):
    name: str
    current_role: str
    years_experience: int
    skills: List[str]
    education: List[Education]
    summary: str
@app.get("/")
def home():
    return {"message": "Resume Analyzer API Running"}


@app.post("/analyze-resume")
async def analyze_resume(file: UploadFile = File(...)):

    pdf = PdfReader(file.file)

    extracted_text = ""

    for page in pdf.pages:
        text = page.extract_text()

        if text:
            extracted_text += text

    prompt = f"""
Extract resume information.

Return ONLY valid JSON.

{{
  "name": "",
  "current_role": "",
  "years_experience": 0,
  "skills": [],
  "education": [
    {{
      "degree": "",
      "institution": "",
      "years": ""
    }}
  ],
  "summary": ""
}}

Resume Text:
{extracted_text}
"""

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You are a resume parser. Return only JSON."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        ai_response = response.choices[0].message.content

        ai_response = ai_response.replace("```json", "")
        ai_response = ai_response.replace("```", "")
        ai_response = ai_response.strip()

        parsed_data = json.loads(ai_response)

        validated_resume = ResumeData(**parsed_data)

        return validated_resume

    except Exception as e:
        return {
            "error": str(e)
        }