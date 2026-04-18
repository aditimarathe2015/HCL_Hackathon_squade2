import * as React from "react";
import type { ApplicationFormValues } from "../../types/applicationForm";
import { incomeRangeOptions } from "../../types/applicationForm";

function getIncomeLabel(value: string): string {
  const found = incomeRangeOptions.find((o) => o.value === value);
  return found ? found.label : value || "—";
}

export interface ReviewStepProps {
  values: ApplicationFormValues;
  isSubmitting: boolean;
  onBack: () => void;
}

export function ReviewStep({
  values,
  isSubmitting,
  onBack,
}: ReviewStepProps): React.ReactElement {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h3 className="h5 card-title">Review application</h3>
        <p className="text-body-secondary small mb-3">
          Please review your application details before submitting.
        </p>
        <div className="border rounded p-3 bg-light mb-0">
          <p>
            <strong>First name:</strong> {values.firstName || "-"}
          </p>
          <p>
            <strong>Middle name:</strong> {values.middleName || "-"}
          </p>
          <p>
            <strong>Last name:</strong> {values.lastName || "-"}
          </p>
          <p>
            <strong>Email:</strong> {values.email || "-"}
          </p>
          <p>
            <strong>Phone:</strong> {values.phone || "-"}
          </p>
          <p>
            <strong>PAN number:</strong> {values.panNumber || "-"}
          </p>
          <p>
            <strong>Date of birth:</strong> {values.dob || "-"}
          </p>
          <p>
            <strong>Organization:</strong> {values.organizationName || "-"}
          </p>
          <p>
            <strong>Income range:</strong> {getIncomeLabel(values.incomeRange)}
          </p>
        </div>
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
            type="submit"
            className="btn btn-success ms-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting…" : "Submit application"}
          </button>
        </div>
      </div>
    </div>
  );
}
