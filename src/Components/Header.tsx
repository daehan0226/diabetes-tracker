import React, { FC, useEffect, useState } from "react";
import { Flex, Title, Button } from "@mantine/core";
import { deleteToken, isTokenValid } from "../Hepler";
import { useNavigate } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../Hookes";

const Header: FC = () => {
  const state = useAuthState();
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const result = isTokenValid();
    if (result) {
      dispatch({ type: "LOG_IN" });
    } else {
      dispatch({ type: "LOG_OUT" });
    }
  }, []);
  return (
    <Flex direction={"column"} mt={16} h={60}>
      <Title order={3} align="center" color="blue">
        Daily Diabetes Tracking
      </Title>

      {state.loggedIn ? (
        <Button
          ml="auto"
          w={200}
          h={30}
          variant="white"
          onClick={() => {
            dispatch({ type: "LOG_OUT" });
            deleteToken();
            navigate("/");
          }}
        >
          logout
        </Button>
      ) : (
        <Button
          ml="auto"
          w={200}
          h={30}
          variant="white"
          onClick={() => {
            navigate("/login");
          }}
        >
          login
        </Button>
      )}
    </Flex>
  );
};

export default Header;
