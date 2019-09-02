import React, { Component } from "react";
import { Button, Container } from "@material-ui/core";
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
    this.setState({ chosenApplicationType: formType });
  }

  renderNewAccountOpenOptions() {
    return (
      <Container maxWidth="md" className="open__new__acc__options">
        {this.state.btnData.map(btn => {
          return (
            <Button
              className="application__choose__btn"
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
      </Container>
    );
  }

  handleFormTypeRendering() {
    if (!this.state.chosenApplicationType) {
      return this.renderNewAccountOpenOptions();
    } else if (this.state.chosenApplicationType === "everydayAcc") {
      return (
        <EverydayAccountAppForm
          quitForm={this.chosenApplicationFormHandler.bind(this)}
        />
      );
    } else if (this.state.chosenApplicationType === "creditCard") {
      return (
        <CreditCardAppForm
          quitForm={this.chosenApplicationFormHandler.bind(this)}
        />
      );
    }
  }

  render() {
    return (
      <div className="open__new__acc__container">
        {this.handleFormTypeRendering()}
      </div>
    );
  }
}

export default OpenNewAccounts;
