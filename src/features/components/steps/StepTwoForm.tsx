import * as React from "react";
import { FormTextField } from "../../../assets/form/FormTextField";
import { FormRadioGroup } from "../../../assets/form/FormRadioGroup";
import { incomeRangeOptions } from "../../types/applicationForm";

export interface StepTwoFormProps {
  isSubmitting: boolean;
  onBack: () => void;
  onNext: () => Promise<void> | void;
}

export function StepTwoForm({
  isSubmitting,
  onBack,
  onNext,
}: StepTwoFormProps): React.ReactElement {
  return (
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
      <div className="card-footer bg-white border-top-0 pt-0">
        <div className="d-flex justify-content-between mt-4 gap-2 flex-wrap">
          <button
            type="button"
            className="btn btn-outline-secondary"
            disabled={isSubmitting}
            onClick={onBack}
          >
            Back
          </button>
          <button
            type="button"
            className="btn btn-primary ms-auto"
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
