import { createSlice } from "@reduxjs/toolkit";
import type { FormState } from "../interfaces";
import {
  addFormField,
  removeFormField,
  reorderFormField,
  setFormTitle,
  updateFormField,
} from "./form.reducers";

const initialState: FormState = {
  title: "",
  fields: [],
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setTitle: setFormTitle,
    addField: addFormField,
    updateField: updateFormField,
    removeField: removeFormField,
    reorderField: reorderFormField,
  },
});

export const { setTitle, addField, updateField, removeField, reorderField } =
  formSlice.actions;
