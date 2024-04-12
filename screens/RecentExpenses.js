import ExpensesOutput from "../components/ExpenseOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

const RecentExpenses = () => {
  [isFetching, setIsFetching] = useState(true);
  [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    const getExpenses = async () => {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError("could not fetch Error !");
      }
      setIsFetching(false);
    };
    getExpenses();
  }, []);
  const errorHandler = () => {
    setError(null);
  };
  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }
  if (isFetching) {
    return <LoadingOverlay />;
  }
  const RecentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);
    return expense.date > date7daysAgo && expense.date <= today;
  });
  return (
    <ExpensesOutput
      expenses={RecentExpenses}
      expensePeriod="Last 7 days"
      fallbackText="No expenses registered for the last 7 days"
    />
  );
};

export default RecentExpenses;
