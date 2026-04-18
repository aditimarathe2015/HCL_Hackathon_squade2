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
  incomeRangeOptions,
  type ApplicationFormValues,
} from "../types/applicationForm";
import {
  fullApplicationSchema,
  getTouchedForStep,
  validateStep1Fields,
  validateStep2Fields,
  yupValidationErrorToFieldErrors,
} from "../validation/creditCardApplicationFormValidation";
import { FormTextField } from "./form/FormTextField";
import { FormRadioGroup } from "./form/FormRadioGroup";
import { StepIndicator } from "./form/StepIndicator";

const STEP_LABELS = [
  "General Information",
  "Professional Details",
  "Review",
];

function getIncomeLabel(value: string): string {
  const found = incomeRangeOptions.find((o) => o.value === value);
  return found ? found.label : value || "—";
}

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
                  ["firstName", "lastName", "email", "dob", "panNumber", "phone", "middleName"].includes(
                    firstPath
                  )
                ) {
                  setStep(1);
                } else if (
                  firstPath &&
                  ["organizationName", "incomeRange"].includes(firstPath)
                ) {
                  setStep(2);
                }
                setSubmitting(false);
                return;
              }
              setSubmitting(false);
              return;
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
          }: FormikProps<ApplicationFormValues>) => (
            <Form
              noValidate
              onKeyDown={(e: React.KeyboardEvent<HTMLFormElement>) => {
                if (e.key === "Enter" && step < 3) {
                  e.preventDefault();
                }
              }}
            >
              {step === 1 ? (
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h3 className="h5 card-title">General Information</h3>
                    <FormTextField
                      name="firstName"
                      label="First name *"
                      type="text"
                      autoComplete="given-name"
                    />
                    <FormTextField
                      name="middleName"
                      label="Middle name"
                      type="text"
                      autoComplete="additional-name"
                    />
                    <FormTextField
                      name="lastName"
                      label="Last name *"
                      type="text"
                      autoComplete="family-name"
                    />
                    <FormTextField
                      name="email"
                      label="Email *"
                      type="email"
                      autoComplete="email"
                    />
                    <FormTextField
                      name="phone"
                      label="Phone"
                      type="tel"
                      autoComplete="tel"
                    />
                    <FormTextField
                      name="panNumber"
                      label="PAN number"
                      type="text"
                      autoComplete="off"
                      maxLength={10}
                    />
                    <FormTextField
                      name="dob"
                      label="Date of birth *"
                      type="date"
                      autoComplete="bday"
                    />
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h3 className="h5 card-title">Professional Details</h3>
                    <FormTextField
                      name="organizationName"
                      label="Organization name *"
                      type="text"
                      autoComplete="organization"
                    />
                    <FormRadioGroup
                      name="incomeRange"
                      label="Income range *"
                      options={incomeRangeOptions.map((o) => ({
                        value: o.value,
                        label: o.label,
                      }))}
                    />
                  </div>
                </div>
              ) : null}

              {step === 3 ? (
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h3 className="h5 card-title">Review application</h3>
                    <p className="text-body-secondary small mb-3">
                      Please review carefully before submit application. 
                    </p>
                    <div className="border rounded p-3 bg-light mb-0">
                      <p>First Name: <span className="font-weight-bold">{values.firstName || '-'}</span></p>
                      
                    </div>
                  </div>
                  <div className="card-footer bg-white border-top-0 pt-0">
                    <div className="d-flex justify-content-between gap-2 flex-wrap">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        disabled={isSubmitting}
                        onClick={() => {
                          setStep(2);
                        }}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="btn btn-success ms-auto"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting…" : "Submit application"}
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}

              {step < 3 ? (
                <div className="d-flex justify-content-between mt-4 gap-2 flex-wrap">
                  {step > 1 ? (
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      disabled={isSubmitting}
                      onClick={() => {
                        setStep((s) =>
                          s > 1 ? ((s - 1) as 1 | 2 | 3) : s
                        );
                      }}
                    >
                      Back
                    </button>
                  ) : (
                    <span />
                  )}
                  <div className="d-flex gap-2 ms-auto">
                    <button
                      type="button"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                      onClick={async () => {
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
                      }}
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : null}
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
