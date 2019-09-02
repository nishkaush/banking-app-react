import React from "react";
import { shallow } from "enzyme";
import AccountsListing from "./AccountsListing";

let props = {
  showTransactions: () => "",
  name: "funky credit card",
  balance: 7000,
  available: 6000,
  delete: () => ""
};

describe("<AccountsListing/>", () => {
  const wrapper = shallow(<AccountsListing {...props} />);
  it("it renders the name of the account correctly", () => {
    expect(wrapper.find(".makeStyles-accountNameColor-1").exists()).toEqual(
      true
    );
    expect(wrapper.find(".makeStyles-accountNameColor-1").text()).toEqual(
      props.name
    );
  });

  it("renders the balance correctly", () => {
    expect(wrapper.find(".makeStyles-posBal-2").text()).toEqual("7000");
  });

  it("renders available balance correctly", () => {
    expect(wrapper.find(".available__balance").text()).toEqual("6000");
  });

  it("renders delete icon correctly", () => {
    expect(wrapper.find(".delete__icon").exists()).toEqual(true);
  });
});
