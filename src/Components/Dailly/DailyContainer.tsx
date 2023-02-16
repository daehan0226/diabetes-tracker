import React, { FC, useEffect, useState } from "react";
import DailyBox from "./DailyBox";
import DailyTable from "./DailyTable";
import {
  Button,
  Container,
  Divider,
  Flex,
  useMantineTheme,
} from "@mantine/core";
import { DisplayType } from "../../@types";
import { useAuthState, useRecordDispatch } from "../../Hookes";
import { getTracking } from "../../Apis";
import { AverageComponent, LineChartComponent } from "./Chart";
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
              <AverageComponent />
            </Container>
          }
        />
      </Routes>
      <Container
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          zIndex: 1000,
          backgroundColor: "white",
          borderTop: "solid 1px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "100%",
        }}
      >
        {Object.values(DisplayType).map((display, index) => (
          <Container m={1} sx={{ maxWidth: "100%" }}>
            <Button
              sx={{ width: 80 }}
              key={`display_${display}_${index}`}
              fullWidth={true}
              variant="subtle"
              onClick={() => navigate(`${display.toLowerCase()}`)}
            >
              {display}
            </Button>
          </Container>
        ))}
      </Container>
    </>
  );
};

export default DailyContainer;
