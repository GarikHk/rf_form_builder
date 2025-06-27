import { FormFieldType, SERVER_URL } from "../constants";
import type {
  Form,
  FormField,
  FormSaveResponse,
  ImportFormResponse,
} from "../interfaces";
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

/**
 * @desc Get the form by ID from the DB.
 */
export async function getFormById(id: string): Promise<ImportFormResponse> {
  try {
    const response = await axios.get<ImportFormResponse>(
      getFullPath(`api/forms/${id}`)
    );
    return response.data;
  } catch (error) {
    console.error("Get form error:", error);
    return {
      message: "Couldn't fetch the form",
      form: null,
    };
  }
}
