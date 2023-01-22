import React, { FC, useEffect, useState } from "react";
import { MealType, IDailyTrackInfo } from "../../@types";
import DailyBox from "./DailyBox";
import DailyTable from "./DailyTable";
import { Button, Container, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const DailyContainer: FC = () => {
  const navigate = useNavigate();
  const [displayTable, setDisplayTable] = useState<boolean>(false);

  const data: IDailyTrackInfo[] = [
    {
      date: "2023-01-22",
      trackingInfo: [
        {
          type: MealType.Fasting,
          bloodSugar: 87,
          time: 0,
        },
        {
          type: MealType.Breakfast,
          time: 0,
          imageUrl: `/assets/images/food.jpg`,
        },
        {
          type: MealType.Breakfast,
          bloodSugar: 103,
          time: 0,
        },
        {
          type: MealType.Lunch,
          time: 0,
          imageUrl: `${process.env.PUBLIC_URL}/assets/images/food.jpg`,
        },
        {
          type: MealType.Lunch,
          bloodSugar: 113,
          time: 0,
        },
        {
          type: MealType.Dinner,
          time: 0,
          imageUrl: `${process.env.PUBLIC_URL}/assets/images/food.jpg`,
        },
        {
          type: MealType.Dinner,
          bloodSugar: 121,
          time: 0,
        },
      ],
    },
    {
      date: "2023-01-23",
      trackingInfo: [
        {
          type: MealType.Fasting,
          bloodSugar: 93,
          time: 0,
        },
        {
          type: MealType.Breakfast,
          time: 0,
          imageUrl: `/assets/images/food.jpg`,
        },
        {
          type: MealType.Breakfast,
          bloodSugar: 106,
          time: 0,
        },
        {
          type: MealType.Lunch,
          time: 0,
          imageUrl: `${process.env.PUBLIC_URL}/assets/images/food.jpg`,
        },
        {
          type: MealType.Lunch,
          bloodSugar: 117,
          time: 0,
        },
        {
          type: MealType.Dinner,
          time: 0,
          imageUrl: `${process.env.PUBLIC_URL}/assets/images/food.jpg`,
        },
        {
          type: MealType.Dinner,
          bloodSugar: 131,
          time: 0,
        },
      ],
    },
  ];

  return (
    <Container mt={0} p={0}>
      <Title order={3} align="center">
        Daily Diabetes Tracking
      </Title>
      <Button m={16} onClick={() => navigate("/form")}>
        {"Add"}
      </Button>
      <Button m={16} onClick={() => setDisplayTable(!displayTable)}>
        {displayTable ? "With images" : "Only numbers"}
      </Button>
      {displayTable ? (
        <DailyTable data={data} />
      ) : (
        <>
          {data.map(({ date, trackingInfo }) => (
            <DailyBox
              key={date}
              date={date}
              trackingInfo={trackingInfo}
            ></DailyBox>
          ))}
        </>
      )}
    </Container>
  );
};

export default DailyContainer;
