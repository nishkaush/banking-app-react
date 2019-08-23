const initialState = {
  userAccounts: []
};

const reducer = (state = initialState, action) => {
  if (action.type === "EVERYDAY_ACC_FORM_SUBMIT") {
    let newObj = {
      ...action.payload,
      balance: action.payload.initialDeposit,
      dateOpened: Date.now(),
      transaction: []
    };
    console.log("finalObj", newObj);
    let newUserAccounts = [...state.userAccounts, newObj];
    return { ...state, userAccounts: newUserAccounts };
  }
  return state;
};

export default reducer;
