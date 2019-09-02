import React from "react";
import { Home } from "./Home";
import { shallow } from "enzyme";

let userAccounts = [
  {
    id: "asdfsadf234234",
    accountType: "Savings Account",
    balance: 40000
  },
  {
    id: "asd3443234d",
    accountType: "Credit Card",
    creditLimit: 1000
  }
];
describe("<Home/>", () => {
  //When userAccounts Array is filled
  describe("Receives a filled userAccounts array", () => {
    const wrapper = shallow(<Home activeAccounts={userAccounts} />);

    it("renders 2 instances of AccountListing component", () => {
      expect(wrapper.find("AccountsListing")).toHaveLength(2);
    });
  });

  //When userAccounts Array is empty
  describe("Receives a filled userAccounts array", () => {
    const wrapper = shallow(<Home activeAccounts={[]} />);
    it("renders a single paragraph", () => {
      expect(wrapper.find(".no__acc__found__text").exists()).toBe(true);
    });
    it("renders a paragraph with specific text to indicate no accounts found", () => {
      expect(wrapper.find(".no__acc__found__text").text()).toEqual(
        "No Accounts Found. Open new accounts to start playing."
      );
    });
  });
});
