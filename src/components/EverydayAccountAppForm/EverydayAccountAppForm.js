import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
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
import { showDialogAC } from "./../../actionCreators/dialogalert";
import { everydayAccFormSubmitAC } from "./../../actionCreators/accounts";

class EveryDayAccountAppForm extends Component {
  state = {
    textfieldsArr: [
      {
        type: "select",
        name: "accountType",
        label: "Choose Account Type",
        value: "",
        touched: false,
        inputProps: {
          type: "text",
          required: true
        }
      },
      {
        type: "input",
        name: "fullName",
        label: "Full Name",
        value: "",
        touched: false,
        inputProps: {
          type: "text",
          required: true
        }
      },
      {
        type: "input",
        name: "email",
        label: "Email",
        value: "",
        touched: false,
        inputProps: {
          type: "email",
          required: true
        }
      },
      {
        type: "input",
        name: "mobile",
        label: "Mobile",
        value: "",
        touched: false,
        inputProps: {
          type: "number",
          required: true
        }
      },
      {
        type: "input",
        name: "initialDeposit",
        label: "Initial Deposit Amount",
        value: "",
        touched: false,
        inputProps: {
          type: "number",
          required: true
        }
      }
    ]
  };

  handleOnChange(ind, event) {
    let targetedObj = { ...this.state.textfieldsArr[ind] };
    targetedObj.value = event.target.value;
    targetedObj.touched = true;
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
          <MenuItem key={34534534} value="Transaction">
            Transaction
          </MenuItem>
          <MenuItem key={3523434} value="Savings">
            Savings
          </MenuItem>
        </Select>
      </FormControl>
    );
  }

  handleFormSubmit() {
    let formError = this.state.textfieldsArr.find(
      e => e.inputProps && e.inputProps.required && !e.value
    );
    formError
      ? this.showDialog({
          status: "Error",
          msg: "Please fill out all required fields before submitting the form"
        })
      : this.submitDataToRedux();
  }

  showDialog(payload) {
    this.setState(state => {
      state.textfieldsArr.forEach(e => {
        if (e.inputProps && e.inputProps.required && !e.value) {
          e.touched = true;
        }
        return state;
      });
    });
    this.props.onShowDialog(showDialogAC(payload));
  }

  submitDataToRedux() {
    let payload = {};
    this.state.textfieldsArr.forEach(elm => {
      payload[elm.name] = elm.value;
    });
    this.props.onFormSubmit(everydayAccFormSubmitAC(payload));
    this.props.onShowDialog(
      showDialogAC({
        status: "Success",
        msg: "Account created successfully!"
      })
    );
    this.setState(state => {
      state.textfieldsArr.forEach(field => {
        field.value = "";
        field.touched = false;
      });
      return state;
    });
  }

  render() {
    return (
      <Container>
        <h3>EveryDayAccount Application form(Made with Material UI)</h3>
        <form className="everyday__account__form">
          {this.state.textfieldsArr.map((elm, ind) =>
            elm.type === "select" ? (
              this.renderSelectElement(elm.label, elm.value, ind)
            ) : (
              <TextField
                inputProps={{ ...elm.inputProps }}
                margin="dense"
                key={elm.label}
                variant="outlined"
                label={elm.label}
                onChange={this.handleOnChange.bind(this, ind)}
                value={elm.value}
                error={!elm.value && elm.touched}
                helperText={
                  !elm.value && elm.touched ? "Field is required" : null
                }
              />
            )
          )}
        </form>
        <div className="bottom_btn_container">
          <Button
            variant="contained"
            color="primary"
            onClick={e => this.props.quitForm(null, e)}
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
    onFormSubmit: action => dispatch(action),
    onShowDialog: action => dispatch(action)
  };
};

EveryDayAccountAppForm.propTypes = {
  onFormSubmit: propTypes.func.isRequired,
  onShowDialog: propTypes.func.isRequired,
  quitForm: propTypes.func.isRequired
};
export default connect(
  null,
  mapDispatchToProps
)(EveryDayAccountAppForm);
