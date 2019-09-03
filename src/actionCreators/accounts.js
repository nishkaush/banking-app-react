export const everydayAccFormSubmitAC = payload => {
  return {
    type: "EVERYDAY_ACC_FORM_SUBMIT",
    payload
  };
};

export const creditCardAppFormSubmitAC = payload => {
  return {
    type: "CREDITCARD__APP__FORM__SUBMIT",
    payload
  };
};

export const transferMoneyAC = payload => {
  return {
    type: "TRANSFER__MONEY",
    payload
  };
};

export const deleteAccountAC = id => {
  return {
    type: "DELETE__ACCOUNT",
    id
  };
};

export const viewAccTransactionsAC = id => {
  return {
    type: "VIEW__ACC__TRANSACTIONS",
    id
  };
};
