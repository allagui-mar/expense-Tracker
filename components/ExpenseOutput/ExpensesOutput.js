import { View, StyleSheet, Text } from "react-native";
import ExpenseSummary from "../Expenses/ExpenseSummary";
import ExpenseList from "../Expenses/ExpenseList";
import { GlobalStyles } from "../../constants/styles";

const ExpensesOutput = ({ expenses, expensePeriod, fallbackText }) => {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;
  if (expenses.length > 0) {
    content = <ExpenseList expenses={expenses} />;
  }
  return (
    <View style={styles.container}>
      <ExpenseSummary expenses={expenses} periodName={expensePeriod} />
      {content}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
