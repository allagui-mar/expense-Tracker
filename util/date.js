const getFormattedDate = (date) => {
  try {
    return date.toISOString().slice(0, 10);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};

export default getFormattedDate;

export const getDateMinusDays = (date, days) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
};
