import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AccountInfo from "./AccountInfo";

configure({ adapter: new Adapter() });

describe("<AccountInfo/>", () => {
  const data = {
    balance: 4500,
    dateOpened: 1567059452680,
    fullName: "Maximillian",
    email: "max@max.com",
    depositOrLimitTxt: "credit limit",
    depositOrLimitVal: 5000
  };
  const wrapper = mount(<AccountInfo {...data} />);

  it("renders 5 rows of tabular data", () => {
    expect(wrapper.find("tr").length).toEqual(5);
  });

  it("received the right props aka equal to data object above", () => {
    expect(wrapper.props()).toEqual(data);
  });

  describe("first row of data", () => {
    it("the first row entry has text as 4500", () => {
      expect(
        wrapper
          .find("td")
          .first()
          .props().children
      ).toEqual(4500);
    });

    it("the first row entry has text colored green", () => {
      expect(
        wrapper
          .find("td")
          .first()
          .props().style.color
      ).toEqual("green");
    });
  });

  describe("second row of data", () => {
    it("renders the correct text for the second row", () => {
      expect(
        wrapper
          .find("th")
          .at(1)
          .props().children
      ).toEqual("Date Opened");
    });
    it("renders the time stamp into the correct format Do MMM YYYY", () => {
      expect(
        wrapper
          .find("td")
          .at(1)
          .props().children
      ).toEqual("29th Aug 2019");
    });
  });
});
