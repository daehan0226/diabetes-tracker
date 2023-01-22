import React, { FC, useEffect, useState } from "react";
import { Flex, Title, Button } from "@mantine/core";
import { deleteToken, isTokenValid } from "../Hepler";
import { useNavigate } from "react-router-dom";

const Header: FC = () => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    setIsValid(isTokenValid());
  }, []);
  return (
    <Flex direction={"column"} mt={16} h={60}>
      <Title order={3} align="center">
        Daily Diabetes Tracking
      </Title>

      {isValid && (
        <Button
          ml="auto"
          w={200}
          h={30}
          variant="white"
          onClick={() => {
            deleteToken();
            navigate("/");
          }}
        >
          logout
        </Button>
      )}
    </Flex>
  );
};

export default Header;
