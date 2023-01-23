import { MealType } from "../@types";

const order = [
  MealType.Fasting,
  MealType.Breakfast,
  MealType.Snack_MORNING,
  MealType.Lunch,
  MealType.Snack_AFTERNOON,
  MealType.Dinner,
  MealType.Snack_NIGHT,
];

export const OrderByArray = (values: any[], orderType: string) => {
  return values.sort((a, b) => {
    if (a[orderType] && b[orderType]) {
      return order.indexOf(a[orderType]) - order.indexOf(b[orderType]);
    }
    return -1;
  });
};
