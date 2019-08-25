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
  componentDidMount() {
    console.log("userAccounts", this.props.activeAccounts);
  }

  handleAccountsListing() {
    if (this.props.activeAccounts.length) {
      return (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell key={23424234} component="th">
                Type
              </TableCell>
              <TableCell key={56767688} component="th">
                Balance ($)
              </TableCell>
              <TableCell key={5676768890} component="th">
                Available ($)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.activeAccounts.map(acc => {
              return (
                <AccountsListing
                  key={acc.id}
                  name={acc.accountType}
                  balance={acc.balance}
                  available={acc.creditLimit ? acc.creditLimit : acc.balance}
                />
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
      <Container maxWidth="md" className={styles.accounts__balance__container}>
        <h2>Your Accounts</h2>
        <hr />
        {this.handleAccountsListing()}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeAccounts: state.AccountsReducer.userAccounts
  };
};
export default connect(mapStateToProps)(Home);
