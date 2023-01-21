import React, { FC, useEffect, useState } from "react";
import { DailyFormType, MealType } from "../../@types/enums";
import { IDailyTrackInfo } from "../../@types/IDailyTrackingInfo";
import DailyBox from "./DailyBox";
import DailyForm from "./DailyForm";
import DailyTable from "./DailyTable";
import { Button, Container, Flex, Title, CloseButton } from "@mantine/core";

const DailyContainer: FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [displayTable, setDisplayTable] = useState<boolean>(false);
  const [formType, setFormType] = useState<DailyFormType>(
    DailyFormType.BloodSugar
  );

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

  const showFormHandler = (type: DailyFormType) => {
    setFormType(type);
    setShowForm(true);
  };

  return (
    <Container m={20}>
      <Title order={3} align="center">
        Daily Diabetes Tracking
      </Title>
      <Flex m={15} justify="center" align="center" direction="column">
        {showForm ? (
          <>
            <CloseButton
              title="Close popover"
              size="xl"
              iconSize={20}
              onClick={() => setShowForm(false)}
            />
            <DailyForm formType={formType} />
          </>
        ) : (
          <>
            <Button m={16} onClick={() => showFormHandler(DailyFormType.Image)}>
              Add Food Image
            </Button>
            <Button
              m={16}
              onClick={() => showFormHandler(DailyFormType.BloodSugar)}
            >
              Record Blood Sugar Level
            </Button>
          </>
        )}
      </Flex>
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
              formType={formType}
            ></DailyBox>
          ))}
        </>
      )}
    </Container>
  );
};

export default DailyContainer;
