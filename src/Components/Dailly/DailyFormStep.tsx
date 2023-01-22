import React, { FC, useState } from "react";
import { DailyFormType } from "../../@types";
import {
  Container,
  Flex,
  CloseButton,
  Button,
  Stepper,
  Group,
} from "@mantine/core";
import { DailyForm } from "./";
import { useNavigate } from "react-router-dom";

const DailyFormStep: FC = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState<number>(0);
  const [formType, setFormType] = useState<DailyFormType>(DailyFormType.Image);

  const showFormHandler = (type: DailyFormType) => {
    setFormType(type);
    setActive(1);
  };

  const prevStep = () => {
    if (active === 0) {
      navigate("/result");
    } else {
      setActive((current) => (current > 0 ? current - 1 : current));
    }
  };

  return (
    <Container size={400}>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step
          label="First step"
          description="Pick form type - Image/Level"
        >
          <Button m={16} onClick={() => showFormHandler(DailyFormType.Image)}>
            Food Image
          </Button>
          <Button
            m={16}
            onClick={() => showFormHandler(DailyFormType.BloodSugar)}
          >
            Blood Sugar Level
          </Button>
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Save information">
          <DailyForm formType={formType} />
        </Stepper.Step>
        <Stepper.Completed>Saved!</Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          {active === 0 ? "Past Result" : "Back"}
        </Button>
      </Group>
    </Container>
  );
};

export default DailyFormStep;
