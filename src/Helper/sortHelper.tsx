import { IDailyObject, ITrackingInfo, MealType } from "../@types";

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

export const setDailyObjectArray = (data: ITrackingInfo[]): IDailyObject[] => {
  const dates = Array.from(new Set(data.map((item: any) => item.date)));
  let format: IDailyObject[] = [];
  for (const d of dates) {
    const recordsByDate = data.filter((r) => r.date === d);
    if (recordsByDate.length > 0) {
      let recordByDate: IDailyObject = {
        date: d,
      };
      for (const r of recordsByDate) {
        switch (r.type) {
          case MealType.Fasting:
            recordByDate.fasting = r.bloodSugar;
            break;
          case MealType.Breakfast:
            recordByDate.breakfast = r.bloodSugar;
            break;
          case MealType.Lunch:
            recordByDate.lunch = r.bloodSugar;
            break;
          case MealType.Dinner:
            recordByDate.dinner = r.bloodSugar;
            break;
          default:
            console.log(`pass meal type, ${r.type}`);
        }
      }
      format.push(recordByDate);
    }
  }
  format.sort((a, b) => (a.date > b.date ? -1 : 1));
  return format;
};
