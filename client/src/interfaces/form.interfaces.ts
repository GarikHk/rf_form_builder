import type { FormFieldType } from "../constants";

export interface FormField {
  id: string;
  label: string;
  type: FormFieldType;
  required: boolean;
  value: string | number | boolean;
  options?: string[];
}
