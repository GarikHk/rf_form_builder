import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Alert, Button, Snackbar, Typography } from "@mui/material";
import { PreviewFields } from "../components/PreviewFields";
import { useForm } from "../hooks";
import { isFieldEmpty } from "../helpers";

export const PreviewForm: React.FC = () => {
  const { title, fields } = useForm();
  const [open, setOpen] = useState(false);

  function handleSubmit(e: React.SyntheticEvent | Event): void {
    e.preventDefault();

    const invalid = fields.some(
      (field) => field.required && isFieldEmpty(field)
    );

    if (invalid) {
      setOpen(true);
    }
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
            <PreviewFields fields={fields} />
            <Box mt={2}>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      )}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error">Please fill in all required fields.</Alert>
      </Snackbar>
    </Box>
  );
};
