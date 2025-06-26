import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import type { FormField, PreviewFieldsProps } from "../interfaces";
import { FormFieldType } from "../constants";
import { useState } from "react";

export const PreviewFields: React.FC<PreviewFieldsProps> = (props) => {
  const { fields } = props;
  const initialState = fields.reduce((acc, field) => {
    acc[field.id] = field.value;
    return acc;
  }, {});

  const [fieldValues, setFieldValues] =
    useState<Record<string, string | number | boolean>>(initialState);

  function handleFieldChange(
    fieldId: string,
    value: string | number | boolean
  ) {
    setFieldValues((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  }

  function renderField(field: FormField) {
    switch (field.type) {
      case FormFieldType.Text:
        return (
          <TextField
            type="text"
            value={fieldValues[field.id]}
            label={field.label}
            required={field.required}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            fullWidth
          />
        );
      case FormFieldType.Number:
        return (
          <TextField
            type="number"
            value={fieldValues[field.id]}
            label={field.label}
            required={field.required}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            fullWidth
          />
        );
      case FormFieldType.Checkbox:
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={Boolean(fieldValues[field.id])}
                onChange={(e) =>
                  handleFieldChange(field.id, e.target.checked as boolean)
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
              value={fieldValues[field.id]}
              label={field.label}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
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
  }

  return (
    <Stack spacing={2}>
      {fields.map((field) => (
        <Box key={field.id} className="form-field">
          {renderField(field)}
        </Box>
      ))}
    </Stack>
  );
};
