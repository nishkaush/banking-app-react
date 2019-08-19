import React, { Component } from "react";
import { Button } from "@material-ui/core";
import "./OpenNewAccounts.css";
import EverydayAccountAppForm from "./../../components/EverydayAccountAppForm/EverydayAccountAppForm";
import CreditCardAppForm from "./../../components/CreditCardAppForm/CreditCardAppForm";

class OpenNewAccounts extends Component {
  state = {
    chosenApplicationType: null,
    btnData: [
      {
        text: "Open An Everyday Account",
        color: "primary",
        formType: "everydayAcc"
      },
      { text: "Open a Credit Card", color: "secondary", formType: "creditCard" }
    ]
  };

  chosenApplicationFormHandler(formType) {
    console.log("this", this);
    console.log("formType", formType);
    this.setState({ chosenApplicationType: formType });
  }
  render() {
    const newAccountOpenOptions = (
      <div className="open__new__acc__options">
        {this.state.btnData.map(btn => {
          return (
            <Button
              key={btn.text}
              size="large"
              color={btn.color}
              variant="contained"
              onClick={this.chosenApplicationFormHandler.bind(
                this,
                btn.formType
              )}
            >
              {btn.text}
            </Button>
          );
        })}
      </div>
    );
    return (
      <div className="open__new__acc__container">
        {!this.state.chosenApplicationType ? newAccountOpenOptions : null}
        {this.state.chosenApplicationType === "everydayAcc" ? (
          <EverydayAccountAppForm
            quitForm={this.chosenApplicationFormHandler.bind(this)}
          />
        ) : null}
        {this.state.chosenApplicationType === "creditCard" ? (
          <CreditCardAppForm
            quitForm={this.chosenApplicationFormHandler.bind(this)}
          />
        ) : null}
      </div>
    );
  }
}

export default OpenNewAccounts;
