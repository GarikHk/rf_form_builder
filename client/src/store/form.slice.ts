import { createSlice } from "@reduxjs/toolkit";
import type { Form } from "../interfaces";
import {
  addFormField,
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
  },
});

export const {
  setTitle,
  addField,
  updateField,
  removeField,
  reorderField,
  setId,
} = formSlice.actions;
