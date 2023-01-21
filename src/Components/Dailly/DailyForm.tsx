import React, { FC } from "react";
import { MealType } from "../../@types/enums";

const DailyForm: FC = () => {
  return (
    <div>
      <h4>{MealType.Fasting}</h4>
      <input type="number" defaultValue={80} min={0} max={1000}></input>

      <h4>{MealType.Breakfast}</h4>
      <input type="number" defaultValue={100} min={0} max={1000}></input>

      <h4>{MealType.Lunch}</h4>
      <input type="number" defaultValue={100} min={0} max={1000}></input>

      <h4>{MealType.Snack}</h4>
      <input type="number" defaultValue={100} min={0} max={1000}></input>
    </div>
  );
};

export default DailyForm;
