import type { AlertColor } from "@mui/material";
import type { FormField } from "./form.interfaces";
import type { Form } from "./store.interfaces";

export interface AddEditFieldModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  onSave: (field: FormField) => void;
  initialField: FormField;
}

export interface ImportFormProps {
  open: boolean;
  onClose: () => void;
  onImport: (toastMessage: ToastMessageState) => void;
}

export interface PreviewFieldProps {
  field: FormField;
  formGroup: Record<string, string | number | boolean>;
  onFieldValueChange: (key: string, value: string | number | boolean) => void;
}

export interface ToastMessageProps {
  open: boolean;
  message: string;
  duration: number;
  severity: AlertColor;
  onClose: () => void;
}

export interface ToastMessageState {
  message: string;
  severity: AlertColor;
}

export interface FormSaveResponse {
  message: string;
  form: Form;
}

export interface ImportFormResponse {
  message: string;
  form: Form | null;
}
