import type { FormField } from "./form.interfaces";

export interface RootState {
  form: FormState;
}

export interface FormState {
  title: string;
  fields: FormField[];
}

export interface ReloadPayload {
  fromIndex: number;
  toIndex: number;
}

export interface UseForm {
  title: string;
  fields: FormField[];
  addFormField: (payload: FormField) => void;
  updateFormField: (payload: FormField) => void;
  updateFormTitle: (payload: string) => void;
  removeFormField: (payload: string) => void;
  reorderFormField: (payload: ReloadPayload) => void;
}
