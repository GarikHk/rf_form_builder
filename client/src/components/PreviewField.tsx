import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import type { PreviewFieldProps } from "../interfaces";
import { FormFieldType } from "../constants";

export const PreviewField: React.FC<PreviewFieldProps> = (props) => {
  const { field, formGroup, onFieldValueChange } = props;

  switch (field.type) {
    case FormFieldType.Text:
      return (
        <TextField
          name={field.label}
          type="text"
          value={formGroup[field.label]}
          label={field.label}
          required={field.required}
          onChange={(e) => onFieldValueChange(field.label, e.target.value)}
          fullWidth
        />
      );
    case FormFieldType.Number:
      return (
        <TextField
          name={field.label}
          type="number"
          value={formGroup[field.label]}
          label={field.label}
          required={field.required}
          onChange={(e) => onFieldValueChange(field.label, e.target.value)}
          fullWidth
        />
      );
    case FormFieldType.Checkbox:
      return (
        <FormControlLabel
          control={
            <Checkbox
              name={field.label}
              checked={Boolean(formGroup[field.label])}
              onChange={(e) =>
                onFieldValueChange(field.label, e.target.checked as boolean)
              }
            />
          }
          label={field.label + (field.required ? " *" : "")}
        />
      );
    case FormFieldType.Select:
      return (
        <FormControl fullWidth>
          <InputLabel>
            {field.label}
            {field.required ? " *" : ""}
          </InputLabel>
          <Select
            name={field.label}
            value={formGroup[field.label]}
            label={field.label}
            onChange={(e) => onFieldValueChange(field.label, e.target.value)}
            fullWidth
          >
            {field.options?.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    default:
      return null;
  }
};
