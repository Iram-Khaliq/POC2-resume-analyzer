import { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/analyze-resume",
        {
          method: "POST",
          body: formData,
        }
      );

     if (!response.ok) {
  throw new Error("Failed to analyze resume");
}

const data = await response.json();
setResult(data);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Resume Analyzer</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>
        Upload Resume
      </button>

      {loading && <p>Analyzing Resume...</p>}

      {result && (
  <div className="result">
    <h2>Resume Analysis</h2>

    {result.error ? (
      <p>{result.error}</p>
    ) : (
      <>
        <p>
          <strong>Name:</strong> {result.name}
        </p>

        <p>
          <strong>Current Role:</strong> {result.current_role}
        </p>

        <p>
          <strong>Experience:</strong>{" "}
          {result.years_experience} Years
        </p>

        <p>
          <strong>Skills:</strong>
        </p>

        <ul>
          {result.skills?.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>

        <p>
          <strong>Education:</strong>
        </p>

        <ul>
         {result.education?.map((edu, index) => (
  <li key={index}>
    {edu.degree} - {edu.institution} ({edu.years})
  </li>
))}
        </ul>

        <p>
          <strong>Summary:</strong>
        </p>

        <p>{result.summary}</p>

        {result.match_score && (
          <p>
            <strong>Match Score:</strong>{" "}
            {result.match_score}%
          </p>
        )}
      </>
    )}
  </div>
      )}
    </div>
  );
}

export default App;