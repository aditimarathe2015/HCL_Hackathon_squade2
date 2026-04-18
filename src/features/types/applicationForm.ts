/** Values collected across all wizard steps */
export interface ApplicationFormValues {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  panNumber: string;
  dob: string;
  organizationName: string;
  incomeRange: string;
}

export const initialApplicationFormValues: ApplicationFormValues = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  phone: "",
  panNumber: "",
  dob: "",
  organizationName: "",
  incomeRange: "",
};

/** Stored values for `incomeRange`; labels shown in UI and review step */
export const incomeRangeOptions = [
  { value: "upto_2l", label: "≤ ₹2,00,000" },
  { value: "2l_3l", label: "₹2,00,000 – ₹3,00,000" },
  { value: "3l_5l", label: "₹3,00,000 – ₹5,00,000" },
] as const;
