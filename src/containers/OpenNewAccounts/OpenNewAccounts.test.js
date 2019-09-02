import React from "react";
import OpenNewAccounts from "./OpenNewAccounts";
import CreditCardAppForm from "./../../components/CreditCardAppForm/CreditCardAppForm";
import EverydayAccountAppForm from "./../../components/EverydayAccountAppForm/EverydayAccountAppForm";
import { shallow } from "enzyme";

describe("<OpenNewAccounts/>", () => {
  describe("shows credit card application", () => {
    const wrapper = shallow(<OpenNewAccounts />);

    it("renders 2 buttons initially", () => {
      expect(wrapper.find(".application__choose__btn")).toHaveLength(2);
    });

    it("opens credit card application if cc button is chosen and then hides both buttons", () => {
      wrapper
        .find(".application__choose__btn")
        .at(1)
        .simulate("click");
      expect(wrapper.find("EverydayAccountAppForm").exists()).toBe(false);
      expect(wrapper.find(CreditCardAppForm).exists()).toEqual(true);
      expect(wrapper.find(".application__choose__btn").exists()).toBe(false);
    });
  });

  describe("shows everyday account application", () => {
    const wrapper = shallow(<OpenNewAccounts />);

    it("opens everyday account application when the correct btn is clicked", () => {
      wrapper
        .find(".application__choose__btn")
        .first()
        .simulate("click");
      expect(wrapper.find(EverydayAccountAppForm).exists()).toBe(true);
    });
  });
});
