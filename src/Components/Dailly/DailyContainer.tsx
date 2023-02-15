import React, { FC, useEffect, useState } from "react";
import DailyBox from "./DailyBox";
import DailyTable from "./DailyTable";
import { Button, Container, Flex, useMantineTheme } from "@mantine/core";
import { DisplayType } from "../../@types";
import { useAuthState, useRecordDispatch } from "../../Hookes";
import { getTracking } from "../../Apis";
import { LineChartComponent } from "./Chart";
import { useMediaQuery } from "@mantine/hooks";
import { Route, Routes, useNavigate } from "react-router-dom";

const DailyContainer: FC = () => {
  const navigate = useNavigate();
  const recordDispatch = useRecordDispatch();
  const authState = useAuthState();
  const { breakpoints } = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.xs}px)`);

  useEffect(() => {
    async function fetchRecords() {
      if (authState.userId) {
        const data = await getTracking(authState.userId);
        recordDispatch({ type: "STORE_DATA", data });
      }
    }
    recordDispatch({ type: "FETCH_DATA" });
    fetchRecords();
  }, [authState.userId]);

  return (
    <>
      <Flex align={"center"} justify={"center"}>
        {Object.values(DisplayType).map((display, index) => (
          <Button
            key={`display_${display}_${index}`}
            m={8}
            onClick={() => navigate(`${display.toLowerCase()}`)}
          >
            {display}
          </Button>
        ))}
      </Flex>
      <Routes>
        <Route
          path="monthly"
          element={
            <Container mt={0} p={0} w={isMobile ? "100%" : 500} h={200}>
              <DailyTable />
            </Container>
          }
        />
        <Route
          path="daily"
          element={
            <Container mt={0} p={0} w={isMobile ? "100%" : 500} h={200}>
              <DailyBox />
            </Container>
          }
        />
        <Route
          path="graph"
          element={
            <Container w={1000} h={800}>
              <LineChartComponent />
            </Container>
          }
        />
      </Routes>
    </>
  );
};

export default DailyContainer;
