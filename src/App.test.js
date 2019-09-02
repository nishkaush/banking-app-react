import React from "react";
import { shallow } from "enzyme";
import { App } from "./App";

const showDialog = false;
const dialogMsg = "how about this funky message";
const dialogStatus = "Success";
const onCloseDialog = () => "";
let props = { showDialog, dialogMsg, dialogStatus, onCloseDialog };

describe("<App/>", () => {
  const wrapper = shallow(<App {...props} />);
  it("renders all the child components correctly ", () => {
    expect(wrapper.find("DialogAlert").exists()).toEqual(true);
    expect(wrapper.find("MenuHeader").exists()).toEqual(true);
    expect(wrapper.find("Route").length).toEqual(5);
  });

  it("renders a loading spinner if initial loading indicator is active", () => {
    wrapper.setState({ showSpinner: true });
    expect(wrapper.find(".App").text()).toEqual("Loading");
  });
});
