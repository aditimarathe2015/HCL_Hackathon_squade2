import * as React from "react";

import {
  Formik,
  Form,
  type FormikHelpers,
  type FormikProps,
} from "formik";
import * as Yup from "yup";
import {
  initialApplicationFormValues,
  type ApplicationFormValues,
} from "../types/applicationForm";
import {
  fullApplicationSchema,
  getTouchedForStep,
  validateStep1Fields,
  validateStep2Fields,
  yupValidationErrorToFieldErrors,
} from "../validation/creditCardApplicationFormValidation";
import { saveUserDetailsJson } from "../../services/applicationApi";
import { StepIndicator } from "../../assets/form/StepIndicator";
import { StepOneForm } from "./steps/StepOneForm";
import { StepTwoForm } from "./steps/StepTwoForm";
import { ReviewStep } from "./steps/ReviewStep";

const STEP_LABELS = [
  "General Information",
  "Professional Details",
  "Review",
];

/**
 * Multi-step credit application: Formik + Yup per-step validation before advancing.
 */
export function ApplicationForm(): React.ReactElement {
  const [step, setStep] = React.useState<1 | 2 | 3>(1);
  const [submittedPayload, setSubmittedPayload] =
    React.useState<ApplicationFormValues | null>(null);

  return (
    <div className="container py-4" style={{ maxWidth: "640px" }}>
      <StepIndicator currentStep={step} labels={STEP_LABELS} />

      {submittedPayload ? (
        <div className="card border-success shadow-sm">
          <div className="card-body">
            <p className="mb-3 fw-semibold text-success-emphasis">
              Application submitted successfully.
            </p>
            <p className="small text-body-secondary mb-3">
              Thank you. Your application has been submitted successfully.
            </p>
          </div>
        </div>
      ) : (
        <Formik
          initialValues={initialApplicationFormValues}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={async (
            values: ApplicationFormValues,
            { setSubmitting, setErrors }: FormikHelpers<ApplicationFormValues>
          ) => {
            try {
              await fullApplicationSchema.validate(values, {
                abortEarly: false,
              });
            } catch (unknownError: unknown) {
              if (unknownError instanceof Yup.ValidationError) {
                const err = unknownError;
                const next = yupValidationErrorToFieldErrors(err);
                setErrors(next);
                const firstPath =
                  err.inner && err.inner.length > 0
                    ? err.inner[0]?.path
                    : err.path;
                if (
                  firstPath &&
                  [
                    "firstName",
                    "lastName",
                    "email",
                    "dob",
                    "panNumber",
                    "phone",
                    "middleName",
                  ].includes(firstPath)
                ) {
                  setStep(1);
                } else if (
                  firstPath && ["organizationName", "incomeRange"].includes(firstPath)
                ) {
                  setStep(2);
                }
                setSubmitting(false);
                return;
              }
              setSubmitting(false);
              return;
            }

            try {
              await saveUserDetailsJson(values);
            } catch (saveError) {
              console.error("Unable to save userDetails.json:", saveError);
            }

            setSubmitting(false);
            setSubmittedPayload({ ...values });
          }}
        >
          {({
            values,
            isSubmitting,
            setErrors,
            setTouched,
          }: FormikProps<ApplicationFormValues>) => {
            const handleStepNext = async (): Promise<void> => {
              if (step === 1) {
                const errs = await validateStep1Fields(values);
                if (Object.keys(errs).length > 0) {
                  setErrors(errs);
                  setTouched(getTouchedForStep(1), false);
                  return;
                }
                setErrors({});
                setStep(2);
                return;
              }

              if (step === 2) {
                const errs = await validateStep2Fields(values);
                if (Object.keys(errs).length > 0) {
                  setErrors(errs);
                  setTouched(getTouchedForStep(2), false);
                  return;
                }
                setErrors({});
                setStep(3);
              }
            };

            return (
              <Form
                noValidate
                onKeyDown={(e: React.KeyboardEvent<HTMLFormElement>) => {
                  if (e.key === "Enter" && step < 3) {
                    e.preventDefault();
                  }
                }}
              >
                {step === 1 && (
                  <StepOneForm isSubmitting={isSubmitting} onNext={handleStepNext} />
                )}
                {step === 2 && (
                  <StepTwoForm
                    isSubmitting={isSubmitting}
                    onBack={() => setStep(1)}
                    onNext={handleStepNext}
                  />
                )}
                {step === 3 && (
                  <ReviewStep
                    values={values}
                    isSubmitting={isSubmitting}
                    onBack={() => setStep(2)}
                  />
                )}
              </Form>
            );
          }}
        </Formik>
      )}
    </div>
  );
}
