import React, { useState } from "react";
import { useCreditScore } from "../../hooks/useCreditScore";

function getCreditLimit(score: number | null): number | null {
  if (!score) return null;

  if (score < 600) return 50000;
  if (score < 750) return 100000;
  if (score >= 750) return 200000;

  return null;
}

export default function CreditScoreForm() {
  const [panInput, setPanInput] = useState("");
  const [submittedPan, setSubmittedPan] = useState<string | undefined>();

  const { score, loading } = useCreditScore(submittedPan);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedPan = panInput.toUpperCase();

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formattedPan)) {
      alert("Invalid PAN format");
      return;
    }

    setSubmittedPan(formattedPan);
  };

  const creditLimit = getCreditLimit(score);

  return (
    <div style={{ maxWidth: 400 }}>
      <h2>Check Credit Score</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter PAN (ABCDE1234F)"
          value={panInput}
          onChange={(e) => setPanInput(e.target.value)}
          style={{ textTransform: "uppercase" }}
        />

        <button type="submit">Check</button>
      </form>

      {loading && <p>Loading...</p>}

      {score !== null && !loading && (
        <div>
          <p><strong>Credit Score:</strong> {score}</p>
          <p>
            <strong>Credit Limit:</strong>{" "}
            {creditLimit ? `₹${creditLimit}` : "Manual Review"}
          </p>
        </div>
      )}
    </div>
  );
}