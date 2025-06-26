import type { FormField } from "./form.interfaces";

export interface RootState {
  form: FormState;
}

export interface FormState {
  title: string;
  fields: FormField[];
}
