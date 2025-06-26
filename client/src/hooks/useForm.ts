import type { FormState, RootState } from "../interfaces";
import { useSelector } from "react-redux";

export function useForm(): FormState {
  const title = useSelector((state: RootState) => state.form.title);
  const fields = useSelector((state: RootState) => state.form.fields);

  return { title, fields };
}
