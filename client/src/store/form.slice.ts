import { createSlice } from "@reduxjs/toolkit";
import type { Form } from "../interfaces";
import {
  addFormField,
  initForm,
  removeFormField,
  reorderFormField,
  setFormId,
  setFormTitle,
  updateFormField,
} from "./form.reducers";

const initialState: Form = {
  _id: "",
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
    setId: setFormId,
    setForm: initForm,
  },
});

export const {
  setTitle,
  addField,
  updateField,
  removeField,
  reorderField,
  setId,
  setForm
} = formSlice.actions;
