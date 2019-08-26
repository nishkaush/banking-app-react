import React, { Component } from "react";
import { connect } from "react-redux";
import TransactionListing from "./../../components/TransactionListing/TransactionListing";
import AccountInfo from "./../../components/AccountInfo/AccountInfo";
import "./TransactionsListing.css";
import { Container } from "@material-ui/core";

class TransactionsListing extends Component {
  componentDidMount() {
    console.log("[TransactionsListing]-this.props", this.props);
    this.props.onFindTransactions(this.props.match.params.id);
  }
  render() {
    const initialDeposit = this.props.account.initialDeposit;
    const creditLimit = this.props.account.creditLimit;
    const initialDepositOrCreditLimitTxt = initialDeposit
      ? `Initial Deposit`
      : `Credit Limit`;
    const initialDepositOrCreditLimitVal = initialDeposit
      ? initialDeposit
      : creditLimit;
    return (
      <Container maxWidth="md" className="transactions__listing__container">
        <h3>{this.props.account.accountType} Account</h3>
        <hr />
        <AccountInfo
          {...this.props.account}
          depositOrLimitTxt={initialDepositOrCreditLimitTxt}
          depositOrLimitVal={initialDepositOrCreditLimitVal}
        />
        <h5>Transactions Listing</h5>
        {!this.props.transactions.length ? (
          <small>No Transactions Found</small>
        ) : null}
        {this.props.transactions.map(tran => (
          <TransactionListing tran={tran} key={tran.date} />
        ))}
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    account: state.AccountsReducer.viewTransactionsForAcc,
    transactions:
      state.AccountsReducer.viewTransactionsForAcc.transactions || []
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFindTransactions: id => dispatch({ type: "VIEW__ACC__TRANSACTIONS", id })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsListing);
