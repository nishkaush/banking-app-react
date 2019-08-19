import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div className="accounts__balance__container">
        <h2>Your Accounts:</h2>
        <p>Transaction Account</p>
        <p>Savings Account</p>
        <p>Credit Card</p>
      </div>
    );
  }
}

export default Home;
