import React, { FC, useState, useEffect } from "react";
import { DailyFormType, MealType } from "../../@types";
import {
  Container,
  Flex,
  CloseButton,
  Button,
  Select,
  Stepper,
  Group,
} from "@mantine/core";
import { DailyForm } from "./";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mantine/dates";

const DailyFormStep: FC = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState<number>(0);
  const [type, setType] = useState<MealType>(MealType.Fasting);
  const [date, setDate] = useState<string>("");

  const prevStep = () => {
    if (active === 0) {
      navigate("/result");
    } else {
      setActive((current) => (current > 0 ? current - 1 : current));
    }
  };

  const setDateFormat = (date: Date | null) => {
    if (date) {
      localStorage.setItem("selectedDate", String(date.getTime()));
      const y = String(date.getFullYear());
      let m = String(date.getMonth() + 1);
      let d = String(date.getDate());
      if (m.length === 1) {
        m = `0${m}`;
      }
      if (d.length === 1) {
        d = `0${d}`;
      }
      setDate(`${y}-${m}-${d}`);
    } else {
      setDate("");
      localStorage.removeItem("selectedDate");
    }
  };

  const setMealType = (value: MealType) => {
    if (value) {
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
            defaultValue={
              localStorage.getItem("selectedDate")
                ? new Date(Number(localStorage.getItem("selectedDate")))
                : new Date()
            }
            onChange={(date) => setDateFormat(date)}
          />
          <Select
            label="Meal"
            placeholder="Fasting"
            onChange={setMealType}
            value={type}
            data={Object.values(MealType)}
            mt={20}
            required
          />
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Save information">
          <DailyForm date={date} type={type} />
        </Stepper.Step>
        <Stepper.Completed>Saved!</Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          {active === 0 ? "Past Result" : "Back"}
        </Button>
        {date && type && (
          <Button variant="default" onClick={() => setActive(1)}>
            Next
          </Button>
        )}
      </Group>
    </Container>
  );
};

export default DailyFormStep;
