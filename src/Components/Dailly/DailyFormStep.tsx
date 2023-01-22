import React, { FC, useState } from "react";
import { DailyFormType } from "../../@types";
import { Container } from "@mantine/core";

const DailyFormStep: FC = () => {
  const [type, setType] = useState<DailyFormType>(DailyFormType.Image);

  return <Container size={400}></Container>;
};

export default DailyFormStep;
