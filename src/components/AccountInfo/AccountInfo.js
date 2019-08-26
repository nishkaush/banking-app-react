import React from "react";
import moment from "moment";

const AccountInfo = props => {
  return (
    <table>
      <tbody>
        <tr>
          <th>Balance ($)</th>
          <td style={props.balance > 0 ? { color: "green" } : { color: "red" }}>
            {props.balance}
          </td>
        </tr>
        <tr>
          <th>Date Opened</th>
          <td>{moment(props.dateOpened).format("Do MMM YYYY")}</td>
        </tr>
        <tr>
          <th>Account Owner</th>
          <td>{props.fullName}</td>
        </tr>
        <tr>
          <th>Contact Email</th>
          <td>{props.email}</td>
        </tr>
        <tr>
          <th>{props.depositOrLimitTxt}</th>
          <td>{props.depositOrLimitVal}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default AccountInfo;
