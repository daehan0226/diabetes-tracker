import React, { FC } from "react";
import "./App.css";
import { Main } from "./Pages";
import { Container } from "@mantine/core";
import { Footer } from "./Components";

const App: FC = () => {
  return (
    <Container size={400} p={0} mt={0} mb={0} h={"100%"}>
      <Main />
      <Footer />
    </Container>
  );
};

export default App;
