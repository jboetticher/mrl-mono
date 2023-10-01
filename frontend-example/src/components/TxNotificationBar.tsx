import { Snackbar, Alert } from "@mui/material";

export function TxNotificationBar(snackOpen: boolean, setSnackOpen: (x: boolean) => void, snackMessage: string) {
  return <Snackbar
    open={snackOpen}
    autoHideDuration={6000}
    onClose={() => setSnackOpen(false)}
    message={snackMessage}
  >
    <Alert onClose={() => setSnackOpen(false)} severity="success" sx={{ width: '100%' }}>
      {snackMessage}
    </Alert>
  </Snackbar>;
}
