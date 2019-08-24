import React from "react";
import { makeStyles } from "@material-ui/core";
import {
  Icon,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  success: {
    color: "green"
  },
  error: {
    color: "red"
  }
}));
const DialogAlert = props => {
  const classes = useStyles();
  return (
    <Dialog maxWidth="sm" open={props.open}>
      <DialogActions>
        <Icon onClick={props.close}>close</Icon>
      </DialogActions>
      <DialogTitle
        className={props.status === "Error" ? classes.error : classes.success}
      >
        {props.status}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{props.msg}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAlert;
