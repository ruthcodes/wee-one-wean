export const guessedMeal = (time: Date) => {
  switch (time.getHours()) {
    case 7:
    case 8:
    case 9:
      return {value: "Breakfast", label: "Breakfast"}
    case 11:
    case 12:
    case 13:
      return {value: "Lunch", label: "Lunch"}
    case 17:
    case 18:
    case 19:
      return {value: "Dinner", label: "Dinner"}
    default:
      return {value: "Snack", label: "Snack"}
  }
}