import React from "react";
import { shallow } from "enzyme";
import { CreditCardAppForm } from "./CreditCardAppForm";

describe("<CreditCardAppForm/>", () => {
  const wrapper = shallow(<CreditCardAppForm />);
  it("renders credit card app form correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  // CHECKING THE FULL NAME FIELD
  describe("checks the Full Name Field", () => {
    it("auto focusses on the full name field first", () => {
      expect(wrapper.find("#fullName").prop("autoFocus")).toEqual(true);
    });
    it("updates the value of the input field, as user types", () => {
      wrapper
        .find("#fullName")
        .simulate("change", { target: { value: "success" } });
      expect(wrapper.find("#fullName").props().value).toEqual("success");
    });

    it("shows an error msg if the fullName isn't atleast 8 characters long", () => {
      wrapper
        .find("#fullName")
        .simulate("change", { target: { value: "error" } });
      wrapper
        .find("#fullName")
        .simulate("blur", { target: { value: "error" } });
      expect(
        wrapper
          .find(".error__msg__helper")
          .at(0)
          .contains(<span>Must be atleast 8 characters long</span>)
      ).toEqual(true);
    });

    it("shows 2 error messages if no fullName is provided", () => {
      wrapper.find("#fullName").simulate("change", { target: { value: "" } });
      wrapper.find("#fullName").simulate("blur", { target: { value: "" } });
      wrapper
        .find(".error__msg__helper")
        .at(0)
        .contains([
          <span>Full Name is required, </span>,
          <span>Must be atleast 8 characters long</span>
        ]);
    });

    // CHECKING THE EMAIL FIELD
    describe("checks the email field", () => {
      it("captures the user input as the user types the email", () => {
        wrapper
          .find("#email")
          .simulate("change", { target: { value: "success" } });
        expect(wrapper.find("#email").props().value).toEqual("success");
      });

      it("throws an error message if user enters an invalid email", () => {
        wrapper
          .find("#email")
          .simulate("change", { target: { value: "errw" } });
        wrapper.find("#email").simulate("blur", { target: { value: "errw" } });
        expect(
          wrapper
            .find(".error__msg__helper")
            .at(1)
            .childAt(0)
            .text()
        ).toEqual("Must be a valid email address");
      });

      it("throws 2 error messages when user doesn't input a value", () => {
        wrapper.find("#email").simulate("change", { target: { value: "" } });
        wrapper.find("#email").simulate("blur", { target: { value: "" } });

        // expect(
        //   wrapper
        //     .find(".error__msg__helper")
        //     .at(1)
        //     .text()
        // ).toEqual("Email is required, Must be a valid email address");
        // OR
        expect(
          wrapper
            .find(".error__msg__helper")
            .at(1)
            .contains([
              <span>Email is required, </span>,
              <span>Must be a valid email address</span>
            ])
        ).toEqual(true);
      });
    });

    // checking the FORM Submission
    describe("submits the form un-Successfully", () => {
      // step 1. mock ---> this.props.onShowDialogAlert = jest.fn()
      const onShowDialogAlert = jest.fn();

      // First Scenario :
      //all fieldsinvalid and assets < liabilities
      it("shows error for when not all required fields have value and when assets < liabilities", () => {
        let currentState = { ...wrapper.state() };
        currentState.textfieldsArr.forEach(e => (e.value = ""));
        wrapper.setState({ textfieldsArr: currentState.textfieldsArr });

        // set the props on thw wrapper
        wrapper.setProps({ onShowDialogAlert });

        // Try Submitting the form and check various scenrios
        wrapper.find("#submitBtn").simulate("click", {
          preventDefault: () => {}
        });

        // ---> check if mock fn called with specific args like error msg and status
        let msg =
          "Provide a valid value for all required fields (marked with *) and ensure assets value is bigger than liabilities";
        let status = "Error";

        expect(onShowDialogAlert).toHaveBeenLastCalledWith({ status, msg });
        expect(onShowDialogAlert).toHaveBeenCalledTimes(1);
      });

      it("shows the correct error message when some required fields are invalid and Assets>Liablities", () => {
        // Second scenario :
        // all fields Invalid but assets> liablities
        // ---> check if mock fn called with specific args like error msg and status
        let currentState = { ...wrapper.state() };
        let obj = { assetsValue: 150, liabilitiesValue: 100, email: "srsre" };
        currentState.textfieldsArr.forEach(e =>
          obj[e.name] ? (e.value = obj[e.name]) : null
        );
        wrapper.setState({ textfieldsArr: currentState.textfieldsArr });
        wrapper.find("#submitBtn").simulate("click", {
          preventDefault: () => {}
        });
        let msg =
          "Provide a valid value for all required fields (marked with *)";
        let status = "Error";
        expect(onShowDialogAlert).toHaveBeenLastCalledWith({ status, msg });
      });

      //Third scenario :
      //all fields are valid but assets < liabilities
      // ---> check if mock fn called with specific args like error msg and status
      it("shows error when all fields have a valid value but Assets < Liabilities", () => {
        let currentState = { ...wrapper.state() };
        let obj = {
          fullName: "Maximillian",
          email: "lol@lol.com",
          creditLimit: 50000,
          assetsValue: 90,
          liabilitiesValue: 200
        };
        currentState.textfieldsArr.forEach(e => {
          if (obj[e.name]) {
            e.value = obj[e.name];
            e.error = false;
          }
        });
        wrapper.setState({ textfieldsArr: currentState.textfieldsArr });
        wrapper.find("#submitBtn").simulate("click", {
          preventDefault: () => {}
        });
        let msg = "Make sure assets value is bigger than liabilities";
        let status = "Error";
        expect(onShowDialogAlert).toHaveBeenLastCalledWith({ status, msg });
      });
    });
  });
});
