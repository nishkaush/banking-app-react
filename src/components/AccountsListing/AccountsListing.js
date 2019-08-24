import React from "react";
import { TableCell, TableRow } from "@material-ui/core";

const AccountsListing = props => {
  return (
    <TableRow>
      <TableCell>{props.name}</TableCell>
      <TableCell>{props.balance ? props.balance : null}</TableCell>
    </TableRow>
  );
};

export default AccountsListing;

// <tr>
// <td>{props.name}</td>
// {props.balance ? <td>{props.balance}</td> : null}
// </tr>
