import { Alert, Snackbar } from "@mui/material";
import type { ToastMessageProps } from "../interfaces";

export const ToastMessage: React.FC<ToastMessageProps> = (props) => {
  const { open, message, onClose, duration, severity } = props;

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};
