import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Button, Stack, Typography } from "@mui/material";
import { PreviewField, ToastMessage } from "../components";
import { useForm } from "../hooks";
import type { ToastMessageState } from "../interfaces";

export const PreviewForm: React.FC = () => {
  const { title, fields } = useForm();
  const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<ToastMessageState>({
    message: "",
    severity: "info",
  });
  const [formGroup, setFormGroup] = useState<
    Record<string, string | number | boolean>
  >(
    fields.reduce<Record<string, string | number | boolean>>((acc, field) => {
      acc[field.label] = field.value;
      return acc;
    }, {})
  );

  function onFieldValueChange(
    label: string,
    value: string | number | boolean
  ): void {
    setFormGroup((prev) => ({
      ...prev,
      [label]: value,
    }));
  }

  function handleSubmit(e: React.SyntheticEvent | Event): void {
    e.preventDefault();

    const invalid = fields.some(
      (field) => field.required && !formGroup[field.label]
    );

    if (invalid) {
      setToastMessage({
        message: "Please fill in all required fields.",
        severity: "error",
      });
    } else {
      setToastMessage({
        message: "The form was successfully submitted.",
        severity: "success",
      });
    }

    console.log("Submitted values:", formGroup);
    setOpen(true);
  }

  function handleClose(): void {
    setOpen(false);
  }

  return (
    <Box sx={{ mx: "auto", p: 3 }}>
      {fields.length === 0 ? (
        <Box textAlign="center" mt={4}>
          <Typography>
            No fields available. Please add fields in the edit tab.
          </Typography>
        </Box>
      ) : (
        <Box>
          <Typography variant="h3" gutterBottom>
            {title}
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              {fields.map((field) => (
                <Box key={field.id}>
                  <PreviewField
                    field={field}
                    formGroup={formGroup}
                    onFieldValueChange={onFieldValueChange}
                  />
                </Box>
              ))}
            </Stack>
            <Box mt={2}>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      )}
      <ToastMessage
        open={open}
        message={toastMessage.message}
        duration={5000}
        severity={toastMessage.severity}
        onClose={handleClose}
      />
    </Box>
  );
};
