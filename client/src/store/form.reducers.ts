import type { PayloadAction } from "@reduxjs/toolkit";
import type { FormField, Form, ReloadPayload } from "../interfaces";

export function setFormTitle(state: Form, action: PayloadAction<string>) {
  state.title = action.payload;
}

export function addFormField(state: Form, action: PayloadAction<FormField>) {
  state.fields.push(action.payload);
}

export function updateFormField(state: Form, action: PayloadAction<FormField>) {
  const index = state.fields.findIndex(
    (field) => field.id === action.payload.id
  );

  if (index !== -1) {
    state.fields[index] = action.payload;
  }
}

export function removeFormField(state: Form, action: PayloadAction<string>) {
  state.fields = state.fields.filter((field) => field.id !== action.payload);
}

export function reorderFormField(
  state: Form,
  action: PayloadAction<ReloadPayload>
) {
  const { fromIndex, toIndex } = action.payload;
  const [movedField] = state.fields.splice(fromIndex, 1);
  state.fields.splice(toIndex, 0, movedField);
}

export function setFormId(state: Form, action: PayloadAction<string>) {
  state._id = action.payload;
}

export function initForm(state: Form, action: PayloadAction<Form>) {
  const { _id, title, fields } = action.payload;

  state._id = _id;
  state.title = title;
  state.fields = fields;
}
