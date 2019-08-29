import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MenuHeader from "./MenuHeader";

configure({ adapter: new Adapter() });

describe("<MenuHeader/>", () => {
  const wrapper = shallow(<MenuHeader />);

  it("renders 3 links upon load", () => {
    expect(wrapper.find("Link")).toHaveLength(3);
  });

  it("renders first link with the 'to' prop = / aka home", () => {
    expect(
      wrapper
        .find("Link")
        .first()
        .prop("to")
    ).toEqual("/");
  });

  it("renders last link with the 'to' prop = /open-new-acc", () => {
    expect(
      wrapper
        .find("Link")
        .last()
        .prop("to")
    ).toEqual("/open-new-acc");
  });
});
