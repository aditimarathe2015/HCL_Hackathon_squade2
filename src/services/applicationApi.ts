import type { ApplicationFormValues } from "../features/types/applicationForm";


export async function saveUserDetailsJson(values: ApplicationFormValues) {
  try {
    const response = await fetch('http://localhost:3001/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      throw new Error('Failed to save data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error saving user details:', error);
    throw error;
  }
}

