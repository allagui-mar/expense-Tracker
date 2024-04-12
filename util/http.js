import axios from "axios";

const BACKEND_URL =
  "https://react-native-course-947c3-default-rtdb.firebaseio.com";

export const storeExpense = async (expenseData) => {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  const id = response.data.name;
  return id;
};

export const fetchExpenses = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/expenses.json`);
    const expenses = [];

    for (const key in response.data) {
      const expenseObj = {
        id: key,
        amount: response.data[key].amount,
        date: new Date(response.data[key].date),
        description: response.data[key].description,
      };
      expenses.push(expenseObj);
    }

    return expenses;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw error;
  }
};

export const updateExpense = (id, expenseData) => {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
};
export const deleteExpenses = (id) => {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
};
