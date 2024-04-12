import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpenses: ({ amount, description, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpenses: (id) => {},
  updateExpenses: (id, { amount, description, date }) => {},
});
const expenseReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...action.payload, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatableItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatableItem;
      return updatedExpenses;
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expenseState, dispatch] = useReducer(expenseReducer, []);
  const addExpenses = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };
  const setExpenses = (expenses) => {
    dispatch({ type: "SET", payload: expenses });
  };
  const deleteExpenses = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };
  const updateExpenses = (id, expenseData) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  };
  const value = {
    expenses: expenseState,
    setExpenses: setExpenses,
    addExpenses: addExpenses,
    deleteExpenses: deleteExpenses,
    updateExpenses: updateExpenses,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};
export default ExpensesContextProvider;
