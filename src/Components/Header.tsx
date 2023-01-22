import React, { FC } from "react";
import { Title } from "@mantine/core";

const Header: FC = () => {
  return (
    <Title order={3} align="center" mt={16} h={40}>
      Daily Diabetes Tracking
    </Title>
  );
};

export default Header;
