import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type React from "react";
import type { AddEditFieldModalProps, FormField } from "../interfaces";
import { useEffect, useState } from "react";
import { FormFieldType } from "../constants";

export const AddEditFieldModal: React.FC<AddEditFieldModalProps> = (props) => {
  const { title, open, onClose, onSave, initialField } = props;
  const [editingField, setEditingField] = useState<FormField>(initialField);
  const [options, setOptions] = useState<string>("");

  useEffect(() => {
    setEditingField(initialField);
    setOptions(initialField.options?.join(", ") ?? "");
  }, [initialField]);

  useEffect(() => {
    setEditingField((prev) => ({
      ...prev,
      options: options.split(",").map((s) => s.trim()),
      value: "",
    }));
  }, [options]);

  function handleClose(): void {
    onClose();
  }

  function handleSave(): void {
    onSave(editingField);
    onClose();
  }

  return (
    <Dialog key={editingField.id} onClose={handleClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ minWidth: "400px", p: 2, mb: 2 }}>
          {/* ○ Field label (text) */}
          <TextField
            name="label"
            label="Label"
            value={editingField.label}
            onChange={(e) =>
              setEditingField((prev) => ({ ...prev, label: e.target.value }))
            }
            fullWidth
          />
          {/* ○ Field type (text, number, checkbox, select) */}
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              name="type"
              value={editingField.type}
              label="Type"
              onChange={(e) =>
                setEditingField((prev) => ({
                  ...prev,
                  type: e.target.value,
                }))
              }
            >
              <MenuItem value={FormFieldType.Text}>Text</MenuItem>
              <MenuItem value={FormFieldType.Number}>Number</MenuItem>
              <MenuItem value={FormFieldType.Checkbox}>Checkbox</MenuItem>
              <MenuItem value={FormFieldType.Select}>Select</MenuItem>
            </Select>
          </FormControl>
          {/* ○ Options list (only for select fields) */}
          {editingField.type === FormFieldType.Select && (
            <TextField
              name="options"
              label="Options (comma separated)"
              value={options}
              onChange={(e) => setOptions(e.target.value)}
              fullWidth
            />
          )}
          {/* ○ Required toggle (boolean) */}
          <FormControlLabel
            control={
              <Checkbox
                name="required"
                checked={editingField.required}
                onChange={(e) =>
                  setEditingField((prev) => ({
                    ...prev,
                    required: e.target.checked as boolean,
                  }))
                }
              />
            }
            label="Required"
          />
          {/* ○ Default value (based on type) */}
          <Box>
            <Typography variant="h6" sx={{ pb: ".5em" }}>
              Field Preview:{" "}
            </Typography>
            {/* Default for text */}
            {editingField.type === FormFieldType.Text && (
              <TextField
                name={editingField.label}
                label={editingField.label}
                value={editingField.value}
                onChange={(e) =>
                  setEditingField((prev) => ({
                    ...prev,
                    value: e.target.value,
                  }))
                }
                fullWidth
                required={editingField.required}
              />
            )}
            {/* Default for number */}
            {editingField.type === FormFieldType.Number && (
              <TextField
                name={editingField.label}
                label={editingField.label}
                value={editingField.value}
                type="number"
                onChange={(e) =>
                  setEditingField((prev) => ({
                    ...prev,
                    value: e.target.value,
                  }))
                }
                fullWidth
                required={editingField.required}
              />
            )}
            {/* Default for select */}
            {editingField.type === FormFieldType.Select && options && (
              <FormControl fullWidth>
                <InputLabel>
                  {editingField.label}
                  {editingField.required && "*"}
                </InputLabel>
                <Select
                  name={editingField.label}
                  value={editingField.value}
                  label="Default Option"
                  onChange={(e) =>
                    setEditingField((prev) => ({
                      ...prev,
                      value: e.target.value,
                    }))
                  }
                  required={editingField.required}
                >
                  {editingField.options?.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {/* Default for checkbox */}
            {editingField.type === FormFieldType.Checkbox && (
              <FormControlLabel
                control={
                  <Checkbox
                    name={editingField.label}
                    checked={editingField.value as boolean}
                    onChange={(e) =>
                      setEditingField((prev) => ({
                        ...prev,
                        value: e.target.checked,
                      }))
                    }
                  />
                }
                label={editingField.label}
              />
            )}
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
