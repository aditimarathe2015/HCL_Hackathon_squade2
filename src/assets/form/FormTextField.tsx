import * as React from "react";
import { useField } from "formik";

export interface FormTextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  name: string;
  label: string;
}

/**
 * Bootstrap-styled text-like input bound to Formik.
 */
export function FormTextField({
  label,
  id,
  ...props
}: FormTextFieldProps): React.ReactElement {
  const [field, meta] = useField(props.name);
  const inputId = id ?? props.name;
  const showError = Boolean(meta.error);

  return (
    <div className="mb-3 text-left">
      <label htmlFor={inputId} className="form-label">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={showError}
        className={
          showError ? "form-control is-invalid" : "form-control"
        }
        {...field}
        {...props}
      />
      {showError ? (
        <div className="invalid-feedback d-block">{meta.error}</div>
      ) : null}
    </div>
  );
}
