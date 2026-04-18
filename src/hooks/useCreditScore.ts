import { useEffect, useState } from "react";

function mockCreditScoreAPI(): Promise<{ score: number }> {
  return Promise.resolve({ score: 800 });
}

export function useCreditScore(pan?: string) {
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!pan) return;

    setLoading(true);

    mockCreditScoreAPI()
      .then((data) => {
        setScore(data.score);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pan]);

  return { score, loading };
}