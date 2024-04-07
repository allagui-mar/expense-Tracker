import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2024-02-25"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 99.29,
    date: new Date("2024-03-27"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2024-02-01"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: new Date("2023-12-19"),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 18.59,
    date: new Date("2023-11-12"),
  },
  {
    id: "e6",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2024-03-29"),
  },
  {
    id: "e7",
    description: "Some bananas",
    amount: 6.99,
    date: new Date("2024-04-02"),
  },
  {
    id: "e8",
    description: "A book 2",
    amount: 12.99,
    date: new Date("2023-12-19"),
  },
  {
    id: "e9",
    description: "Another book",
    amount: 16.59,
    date: new Date("2023-11-12"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpenses: ({ amount, description, date }) => {},
  deleteExpenses: (id) => {},
  updateExpenses: (id, { amount, description, date }) => {},
});
const expenseReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random.toString();
      return [{ ...action.payload, id: id }, ...state];
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
  const [expenseState, dispatch] = useReducer(expenseReducer, DUMMY_EXPENSES);
  const addExpenses = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };
  const deleteExpenses = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };
  const updateExpenses = (id, expenseData) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  };
  const value = {
    expenses: expenseState,
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
