import { useDispatch } from "react-redux/dist/react-redux";
import type {
  FormField,
  ReloadPayload,
  RootState,
  UseForm,
} from "../interfaces";
import { useSelector } from "react-redux";
import {
  addField,
  removeField,
  reorderField,
  setTitle,
  updateField,
} from "../store/form.slice";
import { useCallback } from "react";

export function useForm(): UseForm {
  const dispatch = useDispatch();
  const title = useSelector((state: RootState) => state.form.title);
  const fields = useSelector((state: RootState) => state.form.fields);

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

  return {
    title,
    fields,
    addFormField,
    updateFormField,
    updateFormTitle,
    removeFormField,
    reorderFormField,
  };
}
