const CREDIT_RULES = [
  { max: 200000, limit: 50000 },
  { max: 300000, limit: 75000 },
  { max: 500000, limit: 1000000 },
];

export function getCreditLimit(income: number): number | null {
  return CREDIT_RULES.find(r => income <= r.max)?.limit ?? null;
}