const initialState = {
  userAccounts: []
};

const reducer = (state = initialState, action) => {
  if (action.type === "EVERYDAY_ACC_FORM_SUBMIT") {
    let newObj = {
      ...action.payload,
      balance: action.payload.initialDeposit
        ? parseFloat(action.payload.initialDeposit)
        : 0,
      dateOpened: Date.now(),
      transactions: [],
      id: "everydayAcc" + Math.random()
    };
    let newUserAccounts = [...state.userAccounts, newObj];
    return { ...state, userAccounts: newUserAccounts };
  } else if (action.type === "CREDITCARD__APP__FORM__SUBMIT") {
    let newObj = {
      ...action.payload,
      balance: parseFloat(action.payload.creditLimit),
      dateOpened: Date.now(),
      transactions: [],
      id: "creditCard" + Math.random()
    };
    let newUserAccounts = [...state.userAccounts, newObj];
    return { ...state, userAccounts: newUserAccounts };
  } else if (action.type === "TRANSFER__MONEY") {
    //find the two accounts using the id given in the payload
    let fromAccInd = state.userAccounts.findIndex(
      acc => acc.id === action.payload.fromAccount
    );
    let toAccInd = state.userAccounts.findIndex(
      acc => acc.id === action.payload.toAccount
    );

    let fromAccountObj = { ...state.userAccounts[fromAccInd] };
    let toAccountObj = { ...state.userAccounts[toAccInd] };

    //adjust the balances for each account
    fromAccountObj.balance -= parseFloat(action.payload.amountToTransfer);
    toAccountObj.balance += parseFloat(action.payload.amountToTransfer);

    //write the transaction record for each account
    let creditTransactionObj = {
      transactionType: "CREDIT",
      from: { id: fromAccountObj.id, name: fromAccountObj.accountType },
      date: Date.now(),
      amount: parseFloat(action.payload.amountToTransfer)
    };
    let debitTransactionObj = {
      transactionType: "DEBIT",
      to: { id: toAccountObj.id, name: toAccountObj.accountType },
      date: Date.now(),
      amount: parseFloat(action.payload.amountToTransfer)
    };

    // also register the same transaction under credit and debit under both objects
    fromAccountObj.transactions.push(debitTransactionObj);
    toAccountObj.transactions.push(creditTransactionObj);

    let newUserAccounts = [...state.userAccounts];

    // then put the objects back in to the state at their respective indexes
    newUserAccounts[fromAccInd] = fromAccountObj;
    newUserAccounts[toAccInd] = toAccountObj;

    return { ...state, userAccounts: newUserAccounts };
  }
  return state;
};

export default reducer;
