import { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpenses } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";
const ManageExpenses = ({ route, navigation }) => {
  [isSubmitting, setIsSubmitting] = useState(false);
  [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = async () => {
    setIsSubmitting(true);
    try {
      await deleteExpenses(editedExpenseId);
      expensesCtx.deleteExpenses(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("could not delete expense - please Try again later");
    }
    setIsSubmitting(false);
  };

  const confirmHandler = async (expenseData) => {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpenses(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpenses({ expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("could not save data- please try again later");
      setIsSubmitting(false);
    }
  };
  const cancelHandler = () => {
    navigation.goBack();
  };

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }
  if (isSubmitting) {
    return <LoadingOverlay />;
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View styles={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={38}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 28,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 26,
    paddingTop: 26,
    borderTopWidth: 3,
    borderTopColor: "white",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
