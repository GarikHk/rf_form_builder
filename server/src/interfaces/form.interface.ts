import { Document } from "mongoose";
import { FormFieldType } from "../constants";

export type FormFieldValue = string | number | boolean;

export interface FormField {
  id: string;
  label: string;
  type: FormFieldType;
  required: boolean;
  value: FormFieldValue;
  options?: string[];
}

export interface FormSchema extends Document {
  title: string;
  fields: FormField[];
  createdAt: Date;
  updatedAt: Date;
}
