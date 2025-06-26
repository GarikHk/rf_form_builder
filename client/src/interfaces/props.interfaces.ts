import type { FormField } from "./form.interfaces";

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