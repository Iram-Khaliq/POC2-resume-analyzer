# Resume Analyzer (POC 2)

## Overview

Resume Analyzer is an AI-powered application that analyzes PDF resumes and converts unstructured resume content into structured JSON data.

The application allows users to upload a resume, extract text from the PDF, and use OpenAI to identify important candidate information such as skills, experience, education, and professional summary.

---

## Features

* Upload PDF resumes
* Extract text using PyPDF
* Analyze resumes using OpenAI GPT-4o-mini
* Extract candidate details:

  * Name
  * Current Role
  * Years of Experience
  * Skills
  * Education
  * Professional Summary
* Validate AI responses using Pydantic
* Display structured results in a React frontend

---

## Tech Stack

### Frontend

* React
* JavaScript
* CSS

### Backend

* FastAPI
* Python

### AI Integration

* OpenAI API (GPT-4o-mini)

### Libraries

* PyPDF
* Pydantic
* Python Dotenv
* FastAPI CORS Middleware

---

## Project Architecture

```text
User Uploads Resume
        ↓
React Frontend
        ↓
FastAPI Backend
        ↓
PyPDF Text Extraction
        ↓
OpenAI GPT-4o-mini
        ↓
Pydantic Validation
        ↓
Structured JSON Response
        ↓
Frontend Display
```

---

## API Endpoints

### Home Endpoint

```http
GET /
```

Response:

```json
{
  "message": "Resume Analyzer API Running"
}
```

---

### Analyze Resume

```http
POST /analyze-resume
```

Request:

* PDF file upload

Response:

```json
{
  "name": "John Doe",
  "current_role": "Software Engineer",
  "years_experience": 3,
  "skills": [
    "Python",
    "React",
    "FastAPI"
  ],
  "education": [
    {
      "degree": "BS Computer Science",
      "institution": "XYZ University",
      "years": "2018-2022"
    }
  ],
  "summary": "Experienced software developer..."
}
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Iram-Khaliq/POC2-resume-analyzer.git
```

### Backend Setup

```bash
cd backend

pip install -r requirements.txt
```

Create a `.env` file:

```env
OPENAI_API_KEY=your_openai_api_key
```

Run Backend:

```bash
python -m uvicorn main:app --reload
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm start
```

---

## Learning Outcomes

This project helped me learn:

* FastAPI API Development
* React Frontend Development
* File Upload Handling
* PDF Processing with PyPDF
* OpenAI API Integration
* Prompt Engineering
* JSON Parsing
* Pydantic Validation
* Full Stack AI Application Development

---

## Future Improvements

* Resume Match Score
* Job Description Matching
* Skills Gap Analysis
* Candidate Ranking
* Resume Recommendations
* Database Storage for Resume History

---

## Author

**Iram Khaliq**

Software Engineer | MERN Stack Developer | AI Enthusiast
