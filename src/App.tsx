import React, { FC } from "react";
import "./App.css";
import Main from "./Pages/Main";
import { Container } from "@mantine/core";

const App: FC = () => {
  return (
    <Container size={400}>
      <Main />
    </Container>
  );
};

export default App;
