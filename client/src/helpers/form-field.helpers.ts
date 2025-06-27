import { FormFieldType, SERVER_URL } from "../constants";
import type { Form, FormField, FormSaveResponse } from "../interfaces";
import axios from "axios";

/**
 * @desc Build an empty form field.
 */
export function buildEmptyFormField(): FormField {
  const id = crypto.randomUUID();

  return {
    id,
    label: "",
    type: FormFieldType.Text,
    required: false,
    value: "",
  };
}

/**
 * @desc Check if a form field is empty.
 */
export function isFieldEmpty(field: FormField): boolean {
  return !field.value || field.value === "";
}

/**
 * @desc Extract the form by the given ID.
 */
export function getFormFieldById(
  fields: FormField[],
  id: string | null
): FormField | undefined {
  if (!id) return undefined;
  return fields.find((field) => field.id === id);
}

/**
 * @desc Get the full path for API calls.
 */
export function getFullPath(path: string): string {
  return `${SERVER_URL}/${path}`;
}

/**
 * @desc Save the form to the DB.
 */
export async function saveForm(form: Form): Promise<FormSaveResponse> {
  try {
    const response = await axios.post<FormSaveResponse>(
      getFullPath("api/forms/save"),
      { form }
    );
    return response.data;
  } catch (error) {
    console.error("Post error:", error);
    return {
      message: "Failed to save",
      form,
    };
  }
}
