const initialState = {
  userAccounts: []
};

const reducer = (state = initialState, action) => {
  if (action.type === "EVERYDAY_ACC_FORM_SUBMIT") {
    let newObj = {
      ...action.payload,
      balance: action.payload.initialDeposit
        ? action.payload.initialDeposit
        : 0,
      dateOpened: Date.now(),
      transactions: []
    };
    let newUserAccounts = [...state.userAccounts, newObj];
    return { ...state, userAccounts: newUserAccounts };
  } else if (action.type === "CREDITCARD__APP__FORM__SUBMIT") {
    let newObj = {
      ...action.payload,
      balance: action.payload.creditLimit,
      dateOpened: Date.now(),
      transactions: []
    };
    let newUserAccounts = [...state.userAccounts, newObj];
    return { ...state, userAccounts: newUserAccounts };
  }
  return state;
};

export default reducer;
