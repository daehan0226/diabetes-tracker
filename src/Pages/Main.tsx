import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../Components/Auth";
import { DailyContainer, DailyFormStep } from "../Components/Dailly";
import { RecordProvider } from "../Hookes";
function Main() {
  return (
    <RecordProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/form" element={<DailyFormStep />} />
        <Route path="/result/*" element={<DailyContainer />} />
      </Routes>
    </RecordProvider>
  );
}

export default Main;
