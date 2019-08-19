import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home/Home";
import MenuHeader from "./components/MenuHeader/MenuHeader";
import TransferMoney from "./containers/TransferMoney/TransferMoney";
import OpenNewAccounts from "./containers/OpenNewAccounts/OpenNewAccounts";
import "./App.css";

class App extends Component {
  state = {
    showSpinner: true
  };

  componentDidMount() {
    setTimeout(() => this.setState({ showSpinner: false }), 500);
  }
  render() {
    const comp = (
      <React.Fragment>
        <MenuHeader />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/transfer-money" component={TransferMoney} />
          <Route path="/open-new-acc" component={OpenNewAccounts} />
          <Route component={Home} />
        </Switch>
      </React.Fragment>
    );
    return (
      <div className="App">{this.state.showSpinner ? "Loading" : comp}</div>
    );
  }
}

export default App;

// <Route path="/" exact component={LoadingPage} />
//
