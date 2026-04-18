import * as Yup from "yup";
import type { ApplicationFormValues } from "../types/applicationForm";

const panOptionalPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}/;


/**
 * Maps a Yup ValidationError to flat field keys Formik expects.
 * Handles both `inner` (abortEarly: false) and single-field root errors.
 */
export function yupValidationErrorToFieldErrors(
  err: Yup.ValidationError
): Record<string, string> {
  const next: Record<string, string> = {};
  if (err.inner && err.inner.length > 0) {
    err.inner.forEach((e) => {
      if (e.path) {
        next[e.path] = e.message;
      }
    });
  }
  if (Object.keys(next).length === 0 && err.path) {
    next[err.path] = err.message;
  }
  return next;
}

/**
 * Returns true if the person is at least 18 years old on today's date.
 */
function isApplicantEligibleForApplyByAge(dobString: string): boolean {
  const dob = new Date(dobString);
  if (Number.isNaN(dob.getTime())) {
    return false;
  }
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age -= 1;
  }
  return age >= 18;
}

export const step1GeneralSchema = Yup.object({
  firstName: Yup.string().trim().required("First name is required"),
  middleName: Yup.string().trim(),
  lastName: Yup.string().trim().required("Last name is required"),
  email: Yup.string()
    .trim()
    .required("Email is required")
    .email("Please enter a valid email address"),
  phone: Yup.string().trim(),
  panNumber: Yup.string()
    .trim()
    .test(
      "pan-format",
      "Enter a valid 10-character PAN (e.g. ABCDE1234F)",
      (value) => {
        if (!value || value.length === 0) {
          return true;
        }
        return panOptionalPattern.test(value.toUpperCase());
      }
    ),
  dob: Yup.string()
    .required("Date of birth is required")
    .test("valid-date", "Please enter a valid date", (value) => {
      if (!value) {
        return false;
      }
      return !Number.isNaN(Date.parse(value));
    })
    .test(
      "min-age",
      "You must be at least 18 years old",
      (value) => !!value && isApplicantEligibleForApplyByAge(value)
    ),
});

export const step2ProfessionalSchema = Yup.object({
  organizationName: Yup.string()
    .trim()
    .required("Organization name is required"),
  incomeRange: Yup.string()
    .required("Please select an income range")
    .oneOf(
      ["upto_2l", "2l_3l", "3l_5l"],
      "Please select a valid income range"
    ),
});

export const fullApplicationSchema = step1GeneralSchema.concat(
  step2ProfessionalSchema
);

const step1FieldKeys: (keyof ApplicationFormValues)[] = [
  "firstName",
  "middleName",
  "lastName",
  "email",
  "phone",
  "panNumber",
  "dob"
];

const step2FieldKeys: (keyof ApplicationFormValues)[] = [
  "organizationName",
  "incomeRange",
];

/**
 * Runs Yup validation for step 1 and returns Formik-shaped field errors.
 */
export async function validateStep1Fields(
  values: ApplicationFormValues
): Promise<Record<string, string>> {
  try {
    await step1GeneralSchema.validate(values, { abortEarly: false });
    return {};
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return yupValidationErrorToFieldErrors(err);
    }
    return {};
  }
}

/**
 * Runs Yup validation for step 2 and returns Formik-shaped field errors.
 */
export async function validateStep2Fields(
  values: ApplicationFormValues
): Promise<Record<string, string>> {
  try {
    await step2ProfessionalSchema.validate(values, { abortEarly: false });
    return {};
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return yupValidationErrorToFieldErrors(err);
    }
    return {};
  }
}

export function getTouchedForStep(
  step: 1 | 2
): Record<string, boolean> {
  const keys = step === 1 ? step1FieldKeys : step2FieldKeys;
  const touched: Record<string, boolean> = {};
  keys.forEach((key) => {
    touched[key] = true;
  });
  return touched;
}
