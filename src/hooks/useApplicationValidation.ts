type ApplicationData = {
  age: number;
  hasRecentApplication: boolean;
};

type ValidationErrors = {
  age?: string;
  application?: string;
};

export function useApplicationValidation() {
  const validate = (data: ApplicationData): ValidationErrors => {
    const errors: ValidationErrors = {};
    console.log(data.age)
    console.log(data.hasRecentApplication)
    if (data.age < 18) {
      errors.age = "Must be above 18";
    }

    if (data.hasRecentApplication) {
      errors.application = "Already applied in last 6 months";
    }

    return errors;
  };

  return { validate };
}