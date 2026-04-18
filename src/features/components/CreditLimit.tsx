import React, { useState } from "react";
import { getCreditLimit } from "../../hooks/useCreditLimit"

export default function CreditLimit() {
  const [income, setIncome] = useState<number | "">("");
  const [limit, setLimit] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (income === "") return;

    const result = getCreditLimit(Number(income));
    setLimit(result);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Credit Limit Calculator</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Enter income"
          value={income}
          onChange={(e) =>
            setIncome(e.target.value ? Number(e.target.value) : "")
          }
        />

        <button type="submit">Check Limit</button>
      </form>

      {limit !== null ? (
        <p>Approved Limit: ₹{limit}</p>
      ) : (
        income !== "" && <p>Manual Review Required</p>
      )}
    </div>
  );
}