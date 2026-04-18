import * as React from "react";
import { FormTextField } from "../../../assets/form/FormTextField";

export interface StepOneFormProps {
  isSubmitting: boolean;
  onNext: () => Promise<void> | void;
}

export function StepOneForm({
  isSubmitting,
  onNext,
}: StepOneFormProps): React.ReactElement {
  return (
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
      <div className="card-footer bg-white border-top-0 pt-0">
        <div className="d-flex justify-content-end mt-4">
          <button
            type="button"
            className="btn btn-primary"
            disabled={isSubmitting}
            onClick={onNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
