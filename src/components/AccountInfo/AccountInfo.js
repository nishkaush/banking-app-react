import React from "react";
import moment from "moment";
import propTypes from "prop-types";

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

AccountInfo.propTypes = {
  balance: propTypes.number.isRequired,
  dateOpened: propTypes.oneOfType([propTypes.string, propTypes.number])
    .isRequired,
  fullName: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
  depositOrLimitTxt: propTypes.string.isRequired,
  depositOrLimitVal: propTypes.oneOfType([propTypes.string, propTypes.number])
    .isRequired
};

AccountInfo.defaultProps = {
  balance: 0,
  dateOpened: 109,
  fullName: "",
  email: "",
  depositOrLimitTxt: "",
  depositOrLimitVal: ""
};
export default AccountInfo;
