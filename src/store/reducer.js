const initialState = {
  dialog: {
    show: false,
    status: "",
    msg: ""
  },
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
      transaction: []
    };
    let newUserAccounts = [...state.userAccounts, newObj];
    return { ...state, userAccounts: newUserAccounts };
  } else if (action.type === "SHOW_DIALOG") {
    return { ...state, dialog: { ...action.payload, show: true } };
  } else if (action.type === "CLOSE_DIALOG") {
    return { ...state, dialog: { show: false, status: "", msg: "" } };
  }
  return state;
};

export default reducer;
