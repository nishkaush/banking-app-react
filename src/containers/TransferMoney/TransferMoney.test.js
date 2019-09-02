import React from "react";
import { shallow } from "enzyme";
import { TransferMoney } from "./TransferMoney";

const options = [
  {
    id: "1",
    accountType: "Credit card",
    balance: 9000,
    dateOpened: "3March 2019",
    fullName: "Maximillian",
    email: "shit@s.com",
    creditLimit: 5000
  },
  {
    id: "2",
    accountType: "Savings",
    balance: 90000,
    dateOpened: "25 Feb 2019",
    fullName: "Andre Negeoi",
    email: "andre@js.com",
    initialDeposit: 1000
  }
];
let payload = {
  fromAccount: "1",
  toAccount: "2",
  amountToTransfer: "5000",
  message: "Sample message is here"
};
const onFormSubmit = jest.fn();
const onShowDialog = jest.fn();
let props = { options, onFormSubmit, onShowDialog };
let initialState = {};

describe("<TransferMoney/>", () => {
  const wrapper = shallow(<TransferMoney {...props} />);
  initialState = { ...wrapper.state() };
  it("doesn't allow form submission until all fields are filled out", () => {
    wrapper
      .find(".submit__btn")
      .simulate("click", { preventDefault: () => "" });
    expect(onShowDialog).toHaveBeenCalledWith({
      status: "Error",
      msg:
        "Ensure to and from accounts are different and all required fields have a value"
    });
  });

  it("successfully submits the form when all fields are filled out", () => {
    wrapper
      .find("select[name='toAccount']")
      .simulate("change", { target: { value: "2" } });
    wrapper
      .find("select[name='fromAccount']")
      .simulate("change", { target: { value: "1" } });

    wrapper
      .find("input[name='amountToTransfer']")
      .simulate("change", { target: { value: "5000" } });
    wrapper
      .find("input[name='message']")
      .simulate("change", { target: { value: "Sample message is here" } });

    wrapper
      .find(".submit__btn")
      .simulate("click", { preventDefault: () => "" });

    expect(onFormSubmit).toHaveBeenCalledTimes(1);
    expect(onFormSubmit).toHaveBeenCalledWith(payload);
    expect(onShowDialog).toHaveBeenCalledWith({
      status: "Success",
      msg: "Transfer Sucessful!"
    });
    expect(wrapper.state()).toEqual(initialState);
  });
});
