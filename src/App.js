import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home/Home";
import MenuHeader from "./components/MenuHeader/MenuHeader";
import TransferMoney from "./containers/TransferMoney/TransferMoney";
import OpenNewAccounts from "./containers/OpenNewAccounts/OpenNewAccounts";
import DialogAlert from "./components/DialogAlert/DialogAlert";
import TransactionsListing from "./containers/TransactionsListing/TransactionsListing";
import "./App.css";

class App extends Component {
  state = {
    showSpinner: false
  };

  // componentDidMount() {
  //   // this.setState({ showSpinner: false });
  //   // setTimeout(() => this.setState({ showSpinner: false }), 500);
  // }
  render() {
    const comp = (
      <React.Fragment>
        <DialogAlert
          open={this.props.showDialog}
          status={this.props.dialogStatus}
          msg={this.props.dialogMsg}
          close={this.props.onCloseDialog.bind(this)}
        />
        <MenuHeader />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/transfer-money" component={TransferMoney} />
          <Route path="/open-new-acc" component={OpenNewAccounts} />
          <Route
            path="/transactions/:id"
            component={TransactionsListing}
          ></Route>
          <Route component={Home} />
        </Switch>
      </React.Fragment>
    );
    return (
      <div className="App">{this.state.showSpinner ? "Loading" : comp}</div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showDialog: state.DialogAlertReducer.dialog.show,
    dialogMsg: state.DialogAlertReducer.dialog.msg,
    dialogStatus: state.DialogAlertReducer.dialog.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCloseDialog: () => dispatch({ type: "CLOSE_DIALOG" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

// <Route path="/" exact component={LoadingPage} />
//
