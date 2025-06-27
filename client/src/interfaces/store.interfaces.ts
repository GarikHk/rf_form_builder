import type { FormField } from "./form.interfaces";

export interface FormState {
  form: Form;
}

export interface Form {
  _id: string;
  title: string;
  fields: FormField[];
}

export interface ReloadPayload {
  fromIndex: number;
  toIndex: number;
}

export interface UseForm {
  id: string;
  title: string;
  fields: FormField[];
  addFormField: (payload: FormField) => void;
  updateFormField: (payload: FormField) => void;
  updateFormTitle: (payload: string) => void;
  removeFormField: (payload: string) => void;
  reorderFormField: (payload: ReloadPayload) => void;
  setFormId: (payload: string) => void;
  initForm: (payload: Form) => void;
}
