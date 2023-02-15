import React, { FC, useState } from "react";
import { MealType } from "../../@types";
import { Container, Button, Select, Stepper, Group } from "@mantine/core";
import { DailyForm } from "./";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mantine/dates";

const DailyFormStep: FC = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState<number>(0);
  const [type, setType] = useState<MealType>(
    (localStorage.getItem("mealType") as MealType) || MealType.Fasting
  );
  const [date, setDate] = useState<Date>(new Date());

  const prevStep = () => {
    if (active === 0) {
      navigate("/result/monthly");
    } else {
      setActive((current) => (current > 0 ? current - 1 : current));
    }
  };

  const setMealType = (value: MealType) => {
    if (value) {
      localStorage.setItem("mealType", value);
      setType(value);
    }
  };

  return (
    <Container size={400} mt={40}>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step label="First step" description="Pick Date and Meal">
          <DatePicker
            mt={20}
            placeholder="Pick date"
            label="Date"
            withAsterisk
            required
            value={date}
            onChange={(date) => {
              if (date) setDate(date);
            }}
            minDate={new Date("2023-01-01")}
            maxDate={new Date()}
          />
          <Select
            label="Meal"
            onChange={setMealType}
            value={type}
            data={Object.values(MealType)}
            mt={20}
            required
          />
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Save information">
          {date && <DailyForm date={date} type={type} />}
        </Stepper.Step>
        <Stepper.Completed>Saved!</Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          {active === 0 ? "Past Result" : "Back"}
        </Button>
        {active === 0 && (
          <Button variant="default" onClick={() => setActive(1)}>
            Next
          </Button>
        )}
      </Group>
    </Container>
  );
};

export default DailyFormStep;
