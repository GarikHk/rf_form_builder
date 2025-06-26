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
import { useDispatch } from "react-redux";
import type { FormField } from "../interfaces";
import {
  addField,
  removeField,
  reorderField,
  setTitle,
  updateField,
} from "../store/form.slice";
import { AddEditFieldModal } from "../components/AddEditFieldModal";
import { buildEmptyFormField } from "../helpers";
import { useForm } from "../hooks";

export const EditForm: React.FC = () => {
  const dispatch = useDispatch();
  const { title, fields } = useForm();

  const [editingField, setEditingField] = useState<FormField>(
    buildEmptyFormField()
  );
  const [openToEdit, setOpenToEdit] = useState(false);
  const [openToAdd, setOpenToAdd] = useState(false);

  const handleAddField = (field: FormField) => {
    dispatch(addField(field));
  };

  const handleEditField = (field: FormField) => {
    dispatch(updateField(field));
  };

  const handleClickEdit = (field: FormField) => {
    setEditingField(field);
    setOpenToEdit(true);
  };

  return (
    <Box sx={{ mx: "auto", p: 3 }}>
      <TextField
        label="Form Name"
        value={title}
        onChange={(e) => dispatch(setTitle(e.target.value))}
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
                    onClick={() => dispatch(removeField(field.id))}
                    sx={{ ml: 1 }}
                  >
                    <Delete />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="move up"
                    onClick={() =>
                      dispatch(
                        reorderField({ fromIndex: idx, toIndex: idx - 1 })
                      )
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
                      dispatch(
                        reorderField({ fromIndex: idx, toIndex: idx + 1 })
                      )
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

      {/* Add or Edit Field Modal */}
      {/* {openToAdd && ( */}
      <AddEditFieldModal
        title="Add a New Field"
        open={openToAdd}
        initialField={buildEmptyFormField()}
        onClose={() => setOpenToAdd(false)}
        onSave={handleAddField}
      />
      {/* )} */}

      <AddEditFieldModal
        title="Edit Field"
        open={openToEdit}
        initialField={editingField}
        onClose={() => setOpenToEdit(false)}
        onSave={handleEditField}
      />

      <Divider sx={{ my: 2 }} />
      <Button
        variant="contained"
        color="primary"
        disabled={!title || fields.length === 0}
        onClick={() => {
          // Save logic here
          alert(
            "Form saved!\n" +
              JSON.stringify({ formName: title, fields }, null, 2)
          );
        }}
      >
        Save Form
      </Button>
    </Box>
  );
};
