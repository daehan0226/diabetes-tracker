import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../Components/Auth";
import { DailyContainer, DailyFormStep } from "../Components/Dailly";
function Main() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/form" element={<DailyFormStep />} />
      <Route path="/result" element={<DailyContainer />} />
    </Routes>
  );
}

export default Main;
