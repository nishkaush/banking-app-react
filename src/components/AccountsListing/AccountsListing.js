import React from "react";
import { TableCell, TableRow } from "@material-ui/core";

const AccountsListing = props => {
  return (
    <TableRow>
      <TableCell>{props.name}</TableCell>
      <TableCell>{props.balance ? props.balance : null}</TableCell>
      <TableCell>{props.available ? props.available : null}</TableCell>
    </TableRow>
  );
};

export default AccountsListing;
