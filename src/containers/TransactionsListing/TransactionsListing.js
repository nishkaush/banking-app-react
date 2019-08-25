import React, { Component } from "react";
import { connect } from "react-redux";

class TransactionsListing extends Component {
  componentDidMount() {
    console.log("[TransactionsListing]-this.props", this.props);
    this.props.onFindTransactions(this.props.match.params.id);
  }
  render() {
    return (
      <div>
        <h3>This is where transactions are listed for account</h3>
        <p>{this.props.account.accountType}</p>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    account: state.AccountsReducer.viewTransactionsForAcc
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
