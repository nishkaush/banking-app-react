import React from "react";
import { makeStyles } from "@material-ui/core";
import propTypes from "prop-types";
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
        <Icon className="close__btn" onClick={props.close}>
          close
        </Icon>
      </DialogActions>
      <DialogTitle
        className={props.status === "Error" ? classes.error : classes.success}
      >
        {props.status}
      </DialogTitle>
      <DialogContent>
        <DialogContentText className="alert__msg">
          {props.msg}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

DialogAlert.propTypes = {
  open: propTypes.bool.isRequired,
  close: propTypes.func.isRequired,
  status: propTypes.string.isRequired,
  msg: propTypes.string.isRequired
};

DialogAlert.defaultProps = {
  open: false,
  close: () => {},
  status: "",
  msg: ""
};
export default DialogAlert;
