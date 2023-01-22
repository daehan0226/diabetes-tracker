import React, { FC } from "react";
import "./App.css";
import { Main } from "./Pages";
import { Container } from "@mantine/core";
import { Footer, Header } from "./Components";

const App: FC = () => {
  return (
    <Container size={400} p={0} mt={0} mb={0} h={"100%"}>
      <Header />
      <Main />
      <Footer />
    </Container>
  );
};

export default App;
