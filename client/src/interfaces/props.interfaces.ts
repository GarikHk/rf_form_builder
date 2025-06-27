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

export interface PreviewFieldsProps {
  fields: FormField[];
}

export interface ToastMessageProps {
  open: boolean;
  message: string;
  duration: number;
  severity: AlertColor;
  onClose: () => void;
}

export interface FormSaveResponse {
  message: string;
  form: Form;
}
