import React, { Component } from "react";
import { Container } from "@material-ui/core";
import { connect } from "react-redux";
import "./TransferMoney.css";

class TransferMoney extends Component {
  state = {
    formFields: [
      {
        type: "select",
        name: "fromAccount",
        id: "from__acc",
        value: ""
      },
      {
        type: "select",
        name: "toAccount",
        id: "to__acc",
        value: ""
      },
      {
        type: "input",
        valueType: "number",
        name: "amountToTransfer",
        value: "",
        label: "Enter Amount to transfer ($)"
      },
      {
        type: "input",
        valueType: "text",
        name: "message",
        value: "",
        label: "Enter a transaction message"
      }
    ]
  };

  handleOnChange(ind, event) {
    let fieldObj = { ...this.state.formFields[ind] };
    fieldObj.value = event.target.value;
    this.setState(state => {
      state.formFields[ind] = fieldObj;
      return state;
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    //first check if all field have value
    let isFormValid = this.checkFormValidity();
    let areToAndFromAccountsDifferent = this.checkFromAndToAccounts();
    isFormValid && areToAndFromAccountsDifferent
      ? this.submitFormData()
      : this.props.onShowDialog({
          status: "Error",
          msg:
            "Ensure to and from accounts are different and all required fields have a value"
        });
  }

  checkFormValidity() {
    return this.state.formFields.every(e => e.value);
  }

  checkFromAndToAccounts() {
    let fromAccObj = {
      ...this.state.formFields.find(e => e.name === "fromAccount")
    };
    let toAccObj = {
      ...this.state.formFields.find(e => e.name === "toAccount")
    };
    return fromAccObj.value !== toAccObj.value ? true : false;
  }

  submitFormData() {
    let payload = {};
    this.state.formFields.forEach(field => {
      payload[field.name] = field.value;
    });
    this.props.onFormSubmit(payload);
    this.props.onShowDialog({ status: "Success", msg: "Transfer Sucessful!" });
    this.setState(state => state.formFields.forEach(e => (e.value = "")));
  }

  render() {
    return (
      <Container maxWidth="sm">
        <h2>Transfer Money</h2>
        <form action="" className="transfer__money__form">
          {this.state.formFields.map((field, ind) =>
            field.type === "select" ? (
              <select
                key={field.id}
                name={field.name}
                id={field.id}
                value={field.value}
                onChange={this.handleOnChange.bind(this, ind)}
              >
                <option value="">
                  {ind === 0 ? "From Account*" : "To Account*"}
                </option>
                {this.props.options.map(elm => (
                  <option value={elm.id} key={elm.id}>
                    {elm.accountType} - ${elm.balance}
                  </option>
                ))}
              </select>
            ) : (
              <input
                key={field.label}
                type={field.valueType}
                value={field.value}
                placeholder={field.label}
                onChange={this.handleOnChange.bind(this, ind)}
              />
            )
          )}
          <button onClick={this.handleFormSubmit.bind(this)}>Submit</button>
        </form>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    options: state.AccountsReducer.userAccounts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFormSubmit: payload => dispatch({ type: "TRANSFER__MONEY", payload }),
    onShowDialog: payload => dispatch({ type: "SHOW_DIALOG", payload })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransferMoney);
