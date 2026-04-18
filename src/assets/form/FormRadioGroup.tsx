import * as React from "react";
import { useField } from "formik";

export interface RadioOption {
  value: string;
  label: string;
}

export interface FormRadioGroupProps {
  name: string;
  label: string;
  options: RadioOption[];
}

/**
 * Bootstrap radio group bound to Formik (single selection).
 */
export function FormRadioGroup({
  name,
  label,
  options,
}: FormRadioGroupProps): React.ReactElement {
  const [field, meta, helpers] = useField(name);
  const groupId = `${name}-group`;
  const showError = Boolean(meta.error);

  return (
    <fieldset className="mb-3">
      <legend className="form-label mb-2">{label}</legend>
      <div
        className={showError ? "is-invalid" : undefined}
        role="radiogroup"
        aria-labelledby={groupId}
        aria-invalid={showError}
      >
        <span id={groupId} className="visually-hidden">
          {label}
        </span>
        {options.map((opt) => (
          <div key={opt.value} className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name={field.name}
              id={`${name}-${opt.value}`}
              value={opt.value}
              checked={field.value === opt.value}
              onChange={() => {
                helpers.setValue(opt.value);
              }}
              onBlur={field.onBlur}
            />
            <label
              className="form-check-label"
              htmlFor={`${name}-${opt.value}`}
            >
              {opt.label}
            </label>
          </div>
        ))}
      </div>
      {showError ? (
        <div className="invalid-feedback d-block">{meta.error}</div>
      ) : null}
    </fieldset>
  );
}
