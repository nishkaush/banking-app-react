const initialState = {
  dialog: {
    show: false,
    status: "",
    msg: ""
  }
};

const reducer = (state = initialState, action) => {
  if (action.type === "SHOW_DIALOG") {
    return { ...state, dialog: { ...action.payload, show: true } };
  } else if (action.type === "CLOSE_DIALOG") {
    return { ...state, dialog: { show: false, status: "", msg: "" } };
  }
  return state;
};

export default reducer;
