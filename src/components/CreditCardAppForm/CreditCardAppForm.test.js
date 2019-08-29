import React from "react";
import { configure, mount, shallow } from "enzyme";
import { Provider } from "react-redux";
import Adapter from "enzyme-adapter-react-16";
import CreditCardAppForm from "./CreditCardAppForm";

configure({ adapter: new Adapter() });

describe("<CreditCardAppForm/>", () => {
  const wrapper = shallow(
    <Provider store={{}}>
      <CreditCardAppForm />
    </Provider>
  );
  it("updates the value of the input field, as user types", () => {
    wrapper
      .find("#fullName")
      .simulate("change", { target: { value: "error" } });

    expect(wrapper.find("#fullName").value).toEqual(true);
  });
});
