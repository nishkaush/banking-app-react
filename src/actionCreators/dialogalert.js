export const showDialogAC = payload => {
  return {
    type: "SHOW_DIALOG",
    payload
  };
};

export const closeDialogAC = () => {
  return {
    type: "CLOSE_DIALOG"
  };
};
