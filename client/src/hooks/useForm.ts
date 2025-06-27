import type {
  FormField,
  ReloadPayload,
  FormState,
  UseForm,
  Form,
} from "../interfaces";
import { useDispatch, useSelector } from "react-redux";
import {
  addField,
  removeField,
  reorderField,
  setForm,
  setId,
  setTitle,
  updateField,
} from "../store/form.slice";
import { useCallback } from "react";

/**
 * @desc Hook to interact with the form store.
 */
export function useForm(): UseForm {
  const dispatch = useDispatch();
  const id = useSelector((state: FormState) => state.form._id);
  const title = useSelector((state: FormState) => state.form.title);
  const fields = useSelector((state: FormState) => state.form.fields);

  const addFormField = useCallback(
    (payload: FormField) => {
      dispatch(addField(payload));
    },
    [dispatch]
  );

  const updateFormField = useCallback(
    (payload: FormField) => {
      dispatch(updateField(payload));
    },
    [dispatch]
  );

  const updateFormTitle = useCallback(
    (payload: string) => {
      dispatch(setTitle(payload));
    },
    [dispatch]
  );

  const removeFormField = useCallback(
    (payload: string) => {
      dispatch(removeField(payload));
    },
    [dispatch]
  );

  const reorderFormField = useCallback(
    (payload: ReloadPayload) => {
      dispatch(reorderField(payload));
    },
    [dispatch]
  );

  const setFormId = useCallback(
    (payload: string) => {
      dispatch(setId(payload));
    },
    [dispatch]
  );

  const initForm = useCallback(
    (payload: Form) => {
      dispatch(setForm(payload));
    },
    [dispatch]
  );

  return {
    id,
    title,
    fields,
    addFormField,
    updateFormField,
    updateFormTitle,
    removeFormField,
    reorderFormField,
    setFormId,
    initForm,
  };
}
