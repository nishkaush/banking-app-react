import React, { Component } from "react";
import { connect } from "react-redux";
import "./EverydayAccountAppForm.css";
import {
  TextField,
  Container,
  Button,
  Select,
  FormControl,
  MenuItem,
  InputLabel
} from "@material-ui/core";

class EveryDayAccountAppForm extends Component {
  state = {
    textfieldsArr: [
      {
        type: "select",
        name: "accountType",
        label: "Choose Account Type",
        value: ""
      },
      { type: "input", name: "fullName", label: "Full Name", value: "" },
      { type: "input", name: "email", label: "Email", value: "" },
      { type: "input", name: "mobile", label: "Mobile", value: "" },
      {
        type: "input",
        name: "initialDeposit",
        label: "Initial Deposit Amount",
        value: ""
      }
    ]
  };

  handleOnChange(ind, event) {
    let targetedObj = { ...this.state.textfieldsArr[ind] };
    targetedObj.value = event.target.value;
    this.setState(state => {
      state.textfieldsArr[ind] = targetedObj;
      return state;
    });
  }

  renderSelectElement(label, val, ind) {
    return (
      <FormControl key={99999} variant="outlined" required>
        <InputLabel htmlFor="everyday_acc_types">{label}</InputLabel>
        <Select
          id="everyday_acc_types"
          onChange={this.handleOnChange.bind(this, ind)}
          value={val}
        >
          <MenuItem key={Math.random()} value="Transaction">
            Transaction
          </MenuItem>
          <MenuItem key={Math.random()} value="Savings">
            Savings
          </MenuItem>
        </Select>
      </FormControl>
    );
  }

  handleFormSubmit() {
    let payload = {};
    this.state.textfieldsArr.forEach(elm => {
      payload[elm.name] = elm.value;
    });
    this.props.onFormSubmit(payload);
    this.setState(state => {
      state.textfieldsArr.forEach(field => (field.value = ""));
      return state;
    });
  }

  render() {
    return (
      <Container>
        <h3>EveryDayAccount Applicaiton form</h3>
        <form className="everyday__account__form">
          {this.state.textfieldsArr.map((elm, ind) =>
            elm.type === "select" ? (
              this.renderSelectElement(elm.label, elm.value, ind)
            ) : (
              <TextField
                margin="dense"
                key={elm.label}
                variant="outlined"
                label={elm.label}
                onChange={this.handleOnChange.bind(this, ind)}
                value={elm.value}
              />
            )
          )}
        </form>
        <div className="bottom_btn_container">
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.props.quitForm(null)}
          >
            Quit Application
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleFormSubmit.bind(this)}
          >
            Submit
          </Button>
        </div>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFormSubmit: formData =>
      dispatch({ type: "EVERYDAY_ACC_FORM_SUBMIT", payload: formData })
  };
};
export default connect(
  null,
  mapDispatchToProps
)(EveryDayAccountAppForm);
