import { useState, useEffect } from "react";

type Status =  "Inital"|"approved" | "rejected";

interface ApiResponse {
  status: Status;
}

export function useApplicationStatus(id?: string) {
  const [status, setStatus] = useState<Status>("Inital");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchStatus();
  }, [id]);

  const fetchStatus = async () => {
      try {
        const res = await fetch(`/api/status/${id}`);
        const data: ApiResponse = await res.json();
        setStatus(data.status);
      } catch (err) {
        setError("Failed to fetch");
      }
    };
  return { status, error };
}