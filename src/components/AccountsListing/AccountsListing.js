import React from "react";
import { TableCell, TableRow, Icon, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  accountNameColor: {
    color: "blue",
    fontWeight: "bold",
    cursor: "pointer"
  },
  posBal: {
    color: "green"
  },
  negBal: {
    color: "red"
  }
}));
const AccountsListing = props => {
  const classes = useStyles();
  return (
    <TableRow>
      <TableCell
        className={classes.accountNameColor}
        onClick={props.showTransactions}
      >
        {props.name}
      </TableCell>
      <TableCell
        className={props.balance > 0 ? classes.posBal : classes.negBal}
      >
        {props.balance ? props.balance : null}
      </TableCell>
      <TableCell>
        {props.available ? (props.available > 0 ? props.available : 0) : null}
      </TableCell>
      <TableCell>
        <Icon onClick={props.delete}>delete</Icon>
      </TableCell>
    </TableRow>
  );
};

export default AccountsListing;
