import AccountsReducer from "./AccountsReducer";

// afterAll(() => {
//   initialState = {
//     viewTransactionsForAcc: {},
//     userAccounts: []
//   };
// });
let initialState = {
  viewTransactionsForAcc: {},
  userAccounts: []
};

const everyDayAccPayload = {
  accountType: "Transaction",
  fullName: "max schwartz",
  email: "max@swartz.com",
  mobile: "0498765323",
  initialDeposit: 2000000
};
const ccPayload = {
  fullName: "lola",
  email: "lala@lola.com",
  creditLimit: 30000,
  assetsValue: 5,
  liabilitiesValue: 3
};

const createAction = (type, payload) => {
  return { type, payload };
};
const everyDayAction = createAction(
  "EVERYDAY_ACC_FORM_SUBMIT",
  everyDayAccPayload
);
const ccAction = createAction("CREDITCARD__APP__FORM__SUBMIT", ccPayload);

describe("Accounts Reducer", () => {
  //for everday account form submission
  // describe("EVERYDAY_ACC_FORM_SUBMIT", () => {
  let finalState = AccountsReducer(initialState, everyDayAction);
  it("adds everyday acc to list of accounts", () => {
    expect(finalState.userAccounts).toHaveLength(1);
  });
  it("added the balance prop to equal initialDeposit", () => {
    expect(finalState.userAccounts[0].balance).toEqual(
      everyDayAccPayload.initialDeposit
    );
  });
  it("everydayacc payload exists as part of the full payload in userAccounts first obj entry", () => {
    expect(finalState.userAccounts[0]).toMatchObject(everyDayAccPayload);
  });
  // });

  // for CC form submission
  let CCfinalState = AccountsReducer(finalState, ccAction);
  it("adds CC to list of accounts", () => {
    expect(CCfinalState.userAccounts).toHaveLength(2);
  });
  it("added the balance prop to equal credit Limit", () => {
    expect(CCfinalState.userAccounts[1].balance).toEqual(ccPayload.creditLimit);
  });
  it("ccpayload exists as part of the full payload in userAccounts first obj entry", () => {
    expect(CCfinalState.userAccounts[1]).toMatchObject(ccPayload);
  });

  const transferPayload = {
    fromAccount: CCfinalState.userAccounts[0].id,
    toAccount: CCfinalState.userAccounts[1].id,
    amountToTransfer: 1000,
    message: "test transaction"
  };
  const transferAction = createAction("TRANSFER__MONEY", transferPayload);

  let TransferFinalState = AccountsReducer(CCfinalState, transferAction);
  it("transfers money from one account to another account correctly", () => {
    expect(TransferFinalState.userAccounts[0].balance).toEqual(1999000);
  });
});
