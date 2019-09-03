import React from "react";
import { TableCell, TableRow, Icon, makeStyles } from "@material-ui/core";
import propTypes from "prop-types";

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
      <TableCell className="available__balance">
        {props.available ? (props.available > 0 ? props.available : 0) : null}
      </TableCell>
      <TableCell>
        <Icon className="delete__icon" onClick={props.delete}>
          delete
        </Icon>
      </TableCell>
    </TableRow>
  );
};

AccountsListing.propTypes = {
  showTransactions: propTypes.func.isRequired,
  name: propTypes.string.isRequired,
  balance: propTypes.number,
  available: propTypes.oneOfType([propTypes.number, propTypes.string]),
  delete: propTypes.func.isRequired
};

AccountsListing.defaultProps = {
  showTransactions: () => {},
  name: "",
  balance: 0,
  available: 0,
  delete: () => {}
};

export default AccountsListing;
