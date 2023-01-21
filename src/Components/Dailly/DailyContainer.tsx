import React, { FC } from "react";
import { MealType } from "../../@types/enums";
import { IDailyTrackInfo } from "../../@types/IDailyTrackingInfo";
import DailyBox from "./DailyBox";
import DailyForm from "./DailyForm";

const DailyContainer: FC = () => {
  const data: IDailyTrackInfo[] = [
    {
      date: "000",
      trackingInfo: [
        {
          type: MealType.Fasting,
          bloodSugar: 80,
          time: 0,
        },
        {
          type: MealType.Breakfast,
          bloodSugar: 80,
          time: 0,
        },
        {
          type: MealType.Lunch,
          bloodSugar: 80,
          time: 0,
        },
      ],
    },
    {
      date: "001",
      trackingInfo: [
        {
          type: MealType.Fasting,
          bloodSugar: 80,
          time: 0,
        },
        {
          type: MealType.Lunch,
          bloodSugar: 80,
          time: 0,
        },
        {
          type: MealType.Dinner,
          bloodSugar: 80,
          time: 0,
        },
      ],
    },
  ];

  return (
    <div>
      <DailyForm />
      {data.map(({ date, trackingInfo }) => (
        <DailyBox key={date} trackingInfo={trackingInfo}></DailyBox>
      ))}
    </div>
  );
};

export default DailyContainer;
