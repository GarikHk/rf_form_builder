import type { PayloadAction } from "@reduxjs/toolkit";
import type { FormField, FormState, ReloadPayload } from "../interfaces";

export function setFormTitle(state: FormState, action: PayloadAction<string>) {
  state.title = action.payload;
}

export function addFormField(
  state: FormState,
  action: PayloadAction<FormField>
) {
  state.fields.push(action.payload);
}

export function updateFormField(
  state: FormState,
  action: PayloadAction<FormField>
) {
  const index = state.fields.findIndex(
    (field) => field.id === action.payload.id
  );

  if (index !== -1) {
    state.fields[index] = action.payload;
  }
}

export function removeFormField(
  state: FormState,
  action: PayloadAction<string>
) {
  state.fields = state.fields.filter((field) => field.id !== action.payload);
}

export function reorderFormField(
  state: FormState,
  action: PayloadAction<ReloadPayload>
) {
  const { fromIndex, toIndex } = action.payload;
  const [movedField] = state.fields.splice(fromIndex, 1);
  state.fields.splice(toIndex, 0, movedField);
}
