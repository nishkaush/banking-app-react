import React from "react";
import { shallow } from "enzyme";
import { TransactionsListing } from "./TransactionsListing";

let match = { params: { id: 2 } };
let account = {
  id: 2,
  accountType: "Credit card",
  balance: 9000,
  dateOpened: "3March 2019",
  fullName: "Maximillian",
  email: "shit@s.com",
  creditLimit: 5000,
  transactions: []
};

let transactions = [
  {
    transactionType: "CREDIT",
    from: { id: "asdfsadfasdasfID", name: "Savings Account" },
    date: Date.now(),
    amount: 400000,
    message: "This is a sample transaction message"
  }
];

describe("<TransactionsListing/>", () => {
  //Transactions do exist on this account
  describe("past transactions do exist on this account", () => {
    const onFindTransactions = jest.fn();
    account.transactions = transactions;
    const wrapper = shallow(
      <TransactionsListing
        onFindTransactions={onFindTransactions}
        account={account}
        transactions={account.transactions}
        match={match}
      />
    );

    afterAll(() => {
      wrapper.unmount();
    });

    it("calls onFindTransactions upon mounting", () => {
      expect(onFindTransactions).toHaveBeenCalledTimes(1);
      expect(onFindTransactions).toHaveBeenCalledWith(match.params.id);
    });

    it("render AccountInfo component correctly", () => {
      expect(wrapper.find("AccountInfo").exists()).toBe(true);
    });

    it("renders TransactionListing compoenent once", () => {
      expect(wrapper.find("TransactionListing").length).toEqual(1);
    });
  });

  //No transactions exist on this account
  describe("past transactions don't exist for this account", () => {
    const onFindTransactions = jest.fn();
    account.transactions = [];
    const wrapper = shallow(
      <TransactionsListing
        onFindTransactions={onFindTransactions}
        account={account}
        transactions={account.transactions}
        match={match}
      />
    );
    it("renders AccountInfo component", () => {
      expect(wrapper.find("AccountInfo").exists()).toEqual(true);
    });
    it("renders a no transactions found text component", () => {
      expect(wrapper.find("small").text()).toEqual("No Transactions Found");
    });
  });
});
