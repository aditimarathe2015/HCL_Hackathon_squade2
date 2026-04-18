import * as React from "react";

export interface StepIndicatorProps {
  currentStep: number;
  labels: string[];
}

/**
 * Simple numbered step indicator using Bootstrap utilities.
 */
export function StepIndicator({
  currentStep,
  labels,
}: StepIndicatorProps): React.ReactElement {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
      {labels.map((text, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isDone = stepNumber < currentStep;
        return (
          <div
            key={text}
            className="d-flex align-items-center gap-2 flex-grow-1"
            style={{ minWidth: "8rem" }}
          >
            <span
              className={
                isActive
                  ? "badge rounded-pill bg-primary"
                  : isDone
                    ? "badge rounded-pill bg-success"
                    : "badge rounded-pill bg-secondary"
              }
            >
              {stepNumber}
            </span>
            <span
              className={
                isActive ? "fw-semibold text-body" : "text-body-secondary"
              }
            >
              {text}
            </span>
          </div>
        );
      })}
    </div>
  );
}
