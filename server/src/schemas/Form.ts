import { model, Schema } from "mongoose";
import { FormField, FormSchema } from "../interfaces";
import { FormFieldType } from "../constants";

const FormFieldSchema = new Schema<FormField>({
  id: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: [
      FormFieldType.Text,
      FormFieldType.Number,
      FormFieldType.Checkbox,
      FormFieldType.Select,
    ],
  },
  label: { type: String, required: true },
  required: { type: Boolean, default: false },
  options: [{ type: String }],
});

const FormSchemaModel = new Schema<FormSchema>(
  {
    title: { type: String, required: true, trim: true },
    fields: [FormFieldSchema],
  },
  {
    timestamps: true,
  }
);

export const FormModel = model<FormSchema>('Form', FormSchemaModel);
