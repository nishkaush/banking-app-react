import React, { Component } from "react";
import { Container } from "@material-ui/core";
import { connect } from "react-redux";
import "./CreditCardAppForm.css";

class CreditCardAppForm extends Component {
  state = {
    textfieldsArr: [
      {
        type: "text",
        name: "fullName",
        label: "Full Name",
        value: "",
        touched: false,
        error: false,
        errorMessages: [],
        validation: {
          onRequired: val => (val ? true : "Full Name is required"),
          onMinLength: val =>
            val.length >= 8 ? true : "Must be atleast 8 characters long"
        }
      },
      {
        type: "email",
        name: "email",
        label: "Email",
        value: "",
        touched: false,
        error: false,
        errorMessages: [],
        validation: {
          onRequired: val => (val ? true : "Email is required"),
          onMinLength: val =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) === true
              ? true
              : "Must be a valid email address"
        }
      },
      {
        type: "number",
        name: "creditLimit",
        label: "Credit Limit ($)",
        value: "",
        touched: false,
        error: false,
        errorMessages: [],
        validation: {
          onRequired: val => (val ? true : "Credit Limit is required"),
          onMinAmount: val => (val > 0 ? true : "Must be greater than 0")
        }
      },
      {
        type: "number",
        name: "assetsValue",
        label: "Total Assets Value ($)",
        value: "",
        touched: false,
        error: false,
        errorMessages: [],
        validation: {
          onRequired: val => (val ? true : "Assets Value is required"),
          onMinAmount: val =>
            val >= 0 ? true : "Must be greater than or equal to 0"
        }
      },
      {
        type: "number",
        name: "liabilitiesValue",
        label: "Total Liabilities Value ($)",
        value: "",
        touched: false,
        error: false,
        errorMessages: [],
        validation: {
          onRequired: val => (val ? true : "Liabilities Value is required"),
          onMinAmount: val =>
            val >= 0 ? true : "Must be greater than or equal to 0"
        }
      }
    ]
  };

  handleOnChange(ind, event) {
    let foundObj = { ...this.state.textfieldsArr[ind] };
    foundObj.value = event.target.value;
    foundObj.touched = true;
    this.setState(state => {
      state.textfieldsArr[ind] = foundObj;
      return state;
    });
  }

  validateField(ind, event) {
    console.log("ind", ind);
    let foundObj = { ...this.state.textfieldsArr[ind] };
    if (
      foundObj.touched === true &&
      Object.entries(foundObj.validation).length
    ) {
      let flag = this.handleValidationFunctions(
        foundObj.validation,
        foundObj,
        event
      );
      this.setupErrorPropsForField(foundObj, ind, flag);
    }
  }

  handleValidationFunctions(validationObj, foundObj, event) {
    let flag = true;
    foundObj.errorMessages = [];
    for (let key in validationObj) {
      let result = validationObj[key](event.target.value);
      if (result !== true) {
        flag = false;
        foundObj.errorMessages.push(result);
      }
    }
    return flag;
  }

  setupErrorPropsForField(foundObj, ind, flag) {
    if (!flag) {
      foundObj.error = true;
      this.setState(state => {
        state.textfieldsArr[ind] = foundObj;
        return state;
      });
    } else {
      foundObj.error = false;
      foundObj.errorMessages = [];
      this.setState(state => {
        state.textfieldsArr[ind] = foundObj;
        return state;
      });
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let allFieldAreValid = this.checkFormValidity();
    let payload = this.preparePayloadForFormSubmission();
    allFieldAreValid && this.checkAssetsAndLiabilities()
      ? this.props.onFormSubmit(payload)
      : alert(
          "Fill out all fields first And make sure your assets are bigger than your liabilities "
        );
  }

  checkFormValidity() {
    return this.state.textfieldsArr.every(
      elm =>
        (!elm.touched && !elm.validation.onRequired) ||
        (!elm.error && elm.value)
    );
  }

  preparePayloadForFormSubmission() {
    let payload = {};
    this.state.textfieldsArr.forEach(e => (payload[e.name] = e.value));
    return payload;
  }

  checkAssetsAndLiabilities() {
    let assetsValue = this.state.textfieldsArr.find(
      e => e.name === "assetsValue"
    );
    let liabilitiesValue = this.state.textfieldsArr.find(
      e => e.name === "liabilitiesValue"
    );
    return assetsValue > liabilitiesValue ? true : false;
  }

  render() {
    return (
      <Container maxWidth="md">
        <h2>Credit card form (Made Manually)</h2>
        <form action="" className="credit__card__app__form">
          {this.state.textfieldsArr.map((elm, ind) => (
            <React.Fragment key={elm.name}>
              <input
                name={elm.name}
                type={elm.type}
                value={elm.value}
                placeholder={elm.label}
                onChange={this.handleOnChange.bind(this, ind)}
                onBlur={this.validateField.bind(this, ind)}
              />
              {elm.error ? (
                <small className="error__msg__helper">
                  {elm.errorMessages.map((msg, index) => (
                    <span key={msg}>
                      {index === elm.errorMessages.length - 1
                        ? msg
                        : `${msg}, `}
                    </span>
                  ))}
                </small>
              ) : null}
            </React.Fragment>
          ))}
          <div className="btn_container">
            <button key={10923} onClick={() => this.props.quitForm(null)}>
              Quit Application
            </button>
            <button key={93499} onClick={this.handleFormSubmit.bind(this)}>
              Submit
            </button>
          </div>
        </form>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFormSubmit: payload =>
      dispatch({ type: "CREDITCARD__APP__FORM__SUBMIT", payload })
  };
};
export default connect(
  null,
  mapDispatchToProps
)(CreditCardAppForm);
