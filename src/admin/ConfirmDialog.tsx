import React, { useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";

interface Props {
  open: boolean;
  onClose: (confirm: boolean) => void;
  title: string;
  text: string;
}

function ConfirmDialog({ onClose, title, text, open }: Props) {
  const confirm = useCallback(() => {
    onClose(true);
  }, [onClose]);

  const decline = useCallback(() => {
    onClose(false);
  }, [onClose]);

  return (
    <Dialog
      open={open}
      onClose={decline}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={decline} color="primary">
          Abbrechen
        </Button>
        <Button onClick={confirm} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
