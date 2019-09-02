const initialState = {
  viewTransactionsForAcc: {},
  userAccounts: [
    // {
    // id: "2",
    // accountType: "Credit card",
    // balance: 9000,
    // dateOpened: "3March 2019",
    // fullName: "Maximillian",
    // email: "shit@s.com",
    // creditLimit: 5000,
    //   transactions: [
    // {
    //   transactionType: "CREDIT",
    //   from: { id: "asdfsadfasdasfID", name: "Savings Account" },
    //   date: Date.now(),
    //   amount: 400000,
    //   message: "This is a sample transaction message"
    // }
    //   ]
    // }
  ]
};

const reducer = (state = initialState, action) => {
  // This handles everyday account form submission
  if (action.type === "EVERYDAY_ACC_FORM_SUBMIT") {
    let newObj = {
      ...action.payload,
      balance: action.payload.initialDeposit
        ? parseFloat(action.payload.initialDeposit)
        : 0,
      dateOpened: Date.now(),
      transactions: [],
      id: "ID" + Math.random()
    };
    let newUserAccounts = [...state.userAccounts, newObj];
    return { ...state, userAccounts: newUserAccounts };
  }

  // =================================================
  // This handles credit card app form submission
  else if (action.type === "CREDITCARD__APP__FORM__SUBMIT") {
    let newObj = {
      ...action.payload,
      balance: parseFloat(action.payload.creditLimit),
      dateOpened: Date.now(),
      transactions: [],
      id: "ID" + Math.random()
    };
    let newUserAccounts = [...state.userAccounts, newObj];
    return { ...state, userAccounts: newUserAccounts };
  }

  // =================================================
  // This handles transfer of money between accounts
  else if (action.type === "TRANSFER__MONEY") {
    //find the index two accounts using the id given in the payload
    let fromAccInd = state.userAccounts.findIndex(
      acc => acc.id === action.payload.fromAccount
    );
    let toAccInd = state.userAccounts.findIndex(
      acc => acc.id === action.payload.toAccount
    );

    //find the actual accounts using indices and create a copy
    let fromAccountObj = { ...state.userAccounts[fromAccInd] };
    let toAccountObj = { ...state.userAccounts[toAccInd] };

    // //make a copy of the nested transactions array(could do it but not needed in this case)
    // fromAccountObj.transactions = fromAccountObj.transactions.map(e=>{
    //   return {...e};
    // })
    // toAccountObj.transactions = toAccountObj.transactions.map(e=>{
    //   return {...e};
    // })

    //adjust the balances for each account
    let amount = action.payload.amountToTransfer;
    fromAccountObj.balance -= parseFloat(amount);
    toAccountObj.balance += parseFloat(amount);

    //write the transaction record for each account
    let msg = action.payload.message;
    let creditTransactionObj = createTransObj(
      "CREDIT",
      fromAccountObj,
      amount,
      msg
    );
    let debitTransactionObj = createTransObj(
      "DEBIT",
      toAccountObj,
      amount,
      msg
    );
    // also register the same transaction under credit and debit under both objects
    fromAccountObj.transactions.push(debitTransactionObj);
    toAccountObj.transactions.push(creditTransactionObj);

    let newUserAccounts = [...state.userAccounts];

    // then put the objects back in to the state at their respective indexes
    newUserAccounts[fromAccInd] = fromAccountObj;
    newUserAccounts[toAccInd] = toAccountObj;

    return { ...state, userAccounts: newUserAccounts };
  }

  // =================================================
  // This handles Account deletion
  else if (action.type === "DELETE__ACCOUNT") {
    let newUserAccounts = state.userAccounts.filter(
      acc => acc.id !== action.id
    );
    return { ...state, userAccounts: newUserAccounts };
  }

  // =================================================
  // This handles setting up the transactions to be viewed for a given account
  // could do a deep clone but not needed in this case since we only push into the array
  // And if the original array were to updated, we would want to know about it
  else if (action.type === "VIEW__ACC__TRANSACTIONS") {
    let foundObj = { ...state.userAccounts.find(acc => acc.id === action.id) };
    return { ...state, viewTransactionsForAcc: foundObj };
  }
  return state;
};
// =====Reducer ends================

// =================================================
// Just an additional helper function
const createTransObj = (type, accountObj, amount, message) => {
  return {
    transactionType: type,
    to: { id: accountObj.id, name: accountObj.accountType },
    date: Date.now(),
    amount: parseFloat(amount),
    message
  };
};

export default reducer;
