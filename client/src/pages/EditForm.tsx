import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { ArrowUpward, ArrowDownward, Edit, Delete } from "@mui/icons-material";
import type { FormField } from "../interfaces";
import { AddEditFieldModal, ToastMessage } from "../components";
import { buildEmptyFormField, saveForm } from "../helpers";
import { useForm } from "../hooks";

export const EditForm: React.FC = () => {
  const {
    id,
    title,
    fields,
    addFormField,
    updateFormField,
    updateFormTitle,
    removeFormField,
    reorderFormField,
    setFormId,
  } = useForm();

  const [editingField, setEditingField] = useState<FormField>(
    buildEmptyFormField()
  );
  const [openToEdit, setOpenToEdit] = useState(false);
  const [openToAdd, setOpenToAdd] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  function handleClickEdit(field: FormField): void {
    setEditingField(field);
    setOpenToEdit(true);
  }

  function handleFormSave(): void {
    saveForm({
      _id: id,
      title,
      fields,
    }).then(({ form }) => {
      setOpenModal(true);

      if (id !== form._id) {
        setFormId(form._id);
      }
    });
  }

  function handleClose(): void {
    setOpenModal(false);
  }

  return (
    <Box sx={{ mx: "auto", p: 3 }}>
      <TextField
        label="Form Name"
        value={title}
        onChange={(e) => updateFormTitle(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        variant="standard"
      />
      <Divider sx={{ mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        Fields
      </Typography>
      <List>
        {fields.map((field, idx) => (
          <Paper key={field.id} sx={{ mb: 1 }}>
            <ListItem
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleClickEdit(field)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => removeFormField(field.id)}
                    sx={{ ml: 1 }}
                  >
                    <Delete />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="move up"
                    onClick={() =>
                      reorderFormField({ fromIndex: idx, toIndex: idx - 1 })
                    }
                    disabled={idx === 0}
                    sx={{ ml: 1 }}
                  >
                    <ArrowUpward />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="move down"
                    onClick={() =>
                      reorderFormField({ fromIndex: idx, toIndex: idx + 1 })
                    }
                    disabled={idx === fields.length - 1}
                    sx={{ ml: 1 }}
                  >
                    <ArrowDownward />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={
                  <>
                    <strong>{field.label || "(No label)"}</strong> [{field.type}
                    ]
                    {field.required && <span style={{ color: "red" }}> *</span>}
                  </>
                }
                secondary={
                  field.type === "select"
                    ? `Options: ${field.options?.join(", ")}`
                    : undefined
                }
              />
            </ListItem>
          </Paper>
        ))}
      </List>
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => setOpenToAdd(true)}
      >
        Add Field
      </Button>

      <AddEditFieldModal
        title="Add a New Field"
        open={openToAdd}
        initialField={buildEmptyFormField()}
        onClose={() => setOpenToAdd(false)}
        onSave={addFormField}
      />

      <AddEditFieldModal
        title="Edit Field"
        open={openToEdit}
        initialField={editingField}
        onClose={() => setOpenToEdit(false)}
        onSave={updateFormField}
      />

      <Divider sx={{ my: 2 }} />
      <Button
        variant="contained"
        disabled={!title || fields.length === 0}
        onClick={handleFormSave}
      >
        Save Form
      </Button>

      <ToastMessage
        open={openModal}
        message="The form was successfully saved!"
        duration={5000}
        severity="success"
        onClose={handleClose}
      />
    </Box>
  );
};
