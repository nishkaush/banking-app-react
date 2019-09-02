import React from "react";
import { shallow } from "enzyme";
import DialogAlert from "./DialogAlert";

describe("<DialogAlert/>", () => {
  //For the Error alert dialog box
  describe("Error Alert", () => {
    const onClose = jest.fn();
    const wrapper = shallow(
      <DialogAlert
        open={true}
        close={onClose}
        status="Error"
        msg={"This is an Error message"}
      />
    );
    afterAll(() => wrapper.unmount());
    it("applies error class to the title", () => {
      expect(wrapper.find(".makeStyles-error-2").exists()).toBe(true);
    });
    it("shows the heading of the alert correctly", () => {
      expect(wrapper.find(".makeStyles-error-2").text()).toEqual("Error");
    });
    it("shows the text of the alert correctly", () => {
      expect(wrapper.find(".alert__msg").text()).toEqual(
        "This is an Error message"
      );
    });
    it("runs the close function successfully upon clicking close btn", () => {
      wrapper.find(".close__btn").simulate("click");
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  //For the Success alert dialog box
  describe("success Alert", () => {
    const onClose = jest.fn();
    const wrapper = shallow(
      <DialogAlert
        open={true}
        close={onClose}
        status="Success"
        msg={"This is an Success message"}
      />
    );
    it("applies success class to the title", () => {
      expect(wrapper.find(".makeStyles-success-1").exists()).toBe(true);
    });
    it("shows the heading of the alert correctly", () => {
      expect(wrapper.find(".makeStyles-success-1").text()).toEqual("Success");
    });
    it("shows the text of the alert correctly", () => {
      expect(wrapper.find(".alert__msg").text()).toEqual(
        "This is an Success message"
      );
    });
    it("runs the close function successfully upon clicking close btn", () => {
      wrapper.find(".close__btn").simulate("click");
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
