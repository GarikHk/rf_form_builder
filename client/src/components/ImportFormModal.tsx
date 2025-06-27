import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import type React from "react";
import type { ImportFormProps } from "../interfaces";
import { useState } from "react";
import { getFormById } from "../helpers";
import { useForm } from "../hooks";

export const ImportFormModal: React.FC<ImportFormProps> = (props) => {
  const { open, onClose, onImport } = props;
  const { initForm } = useForm();
  const [formId, setFormId] = useState<string>("");

  function handleClose(): void {
    onClose();
  }

  function handleImport(event: React.SyntheticEvent | Event): void {
    event.preventDefault();

    getFormById(formId).then(({ form }) => {
      if (!form) {
        console.error("Form not found!");
        onImport({
          message: "The Form was not found!",
          severity: "error",
        });
        return;
      }

      initForm(form);
      onImport({
        message: "The Form was successfully imported!",
        severity: "success",
      });
      handleClose();
    });
  }

  return (
    <Dialog
      component="form"
      onSubmit={handleImport}
      onClose={handleClose}
      open={open}
    >
      <DialogTitle>Import a Form</DialogTitle>
      <DialogContent>
        <Stack sx={{ minWidth: "400px", py: 1 }}>
          <TextField
            name="formId"
            type="text"
            value={formId}
            label="Form ID"
            onChange={(e) => setFormId(e.target.value)}
            required
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="contained">
          Import
        </Button>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
