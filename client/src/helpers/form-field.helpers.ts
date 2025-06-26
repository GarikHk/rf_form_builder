import { FormFieldType } from "../constants";
import type { FormField } from "../interfaces";

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

export function isFieldEmpty(field: FormField): boolean {
  return !field.value || field.value === "";
}

export function getFormFieldById(
  fields: FormField[],
  id: string | null
): FormField | undefined {
  if (!id) return undefined;
  return fields.find((field) => field.id === id);
}
