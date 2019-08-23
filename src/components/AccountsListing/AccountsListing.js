import React from "react";
import { TableCell, TableRow } from "@material-ui/core";

const AccountsListing = props => {
  return (
    <TableRow>
      <TableCell>{props.name}</TableCell>
      <TableCell>{props.balance ? <td>{props.balance}</td> : null}</TableCell>
    </TableRow>
  );
};

export default AccountsListing;

// <tr>
// <td>{props.name}</td>
// {props.balance ? <td>{props.balance}</td> : null}
// </tr>
