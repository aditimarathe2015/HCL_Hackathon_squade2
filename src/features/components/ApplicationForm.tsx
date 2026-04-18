import React, { useState } from "react";
import { useApplicationValidation } from "../../hooks/useApplicationValidation"

const ApplicationForm: React.FC = () => {
  const { validate } = useApplicationValidation();

  const [age, setAge] = useState<number>(0);
  const [hasRecentApplication, setHasRecentApplication] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = () => {
    const validationErrors = validate({ age, hasRecentApplication });
    setErrors(validationErrors);
  };

  return (
    <div>
      <h3>Application Form</h3>

      <input
        type="string"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        placeholder="Enter age"
      />
      {errors.age && <p>{errors.age}</p>}

      <label>
        <input
          type="checkbox"
          checked={hasRecentApplication}
          onChange={(e) => setHasRecentApplication(e.target.checked)}
        />
        Applied in last 6 months
      </label>
      {errors.application && <p>{errors.application}</p>}

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ApplicationForm;