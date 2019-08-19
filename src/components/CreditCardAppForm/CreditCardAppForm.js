import React, { Component } from "react";

class CreditCardAppForm extends Component {
  render() {
    return (
      <div>
        <h1>I am credit card form</h1>
        <button onClick={() => this.props.quitForm(null)}>
          Quit Application
        </button>
      </div>
    );
  }
}

export default CreditCardAppForm;
