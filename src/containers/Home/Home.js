import React, { Component } from "react";
import styles from "./Home.module.css";
import { connect } from "react-redux";
import AccountsListing from "./../../components/AccountsListing/AccountsListing";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
// import { Container } from "@material-ui/core";

class Home extends Component {
  handleAccountsListing() {
    if (this.props.activeAccounts.length) {
      return (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell key={Math.random()} component="th">
                Type
              </TableCell>
              <TableCell key={Math.random()} component="th">
                Balance
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.activeAccounts.map(acc => {
              return (
                <AccountsListing name={acc.accountType} balance={acc.balance} />
              );
            })}
          </TableBody>
        </Table>
      );
    } else {
      return <p>No Accounts Found</p>;
    }
  }

  render() {
    return (
      <Container className={styles.accounts__balance__container}>
        <h2>Your Accounts</h2>
        <hr />
        {this.handleAccountsListing()}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeAccounts: state.userAccounts
  };
};
export default connect(mapStateToProps)(Home);
