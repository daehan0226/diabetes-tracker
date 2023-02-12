import React, { FC, useEffect, useState } from "react";
import DailyBox from "./DailyBox";
import DailyTable from "./DailyTable";
import { Button, Container, Flex } from "@mantine/core";
import { DisplayType } from "../../@types";
import { useAuthState, useRecordDispatch } from "../../Hookes";
import { getTracking } from "../../Apis";
import { LineChartComponent } from "./Chart";

const DailyContainer: FC = () => {
  const [displayType, setDisplayType] = useState<DisplayType>(
    DisplayType.MONTH
  );
  const recordDispatch = useRecordDispatch();
  const authState = useAuthState();

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
            key={`display_${displayType}_${index}`}
            m={8}
            onClick={() => setDisplayType(display)}
          >
            {display}
          </Button>
        ))}
      </Flex>
      {displayType === DisplayType.GRAPH ? (
        <Container w={1000} h={800}>
          <LineChartComponent />
        </Container>
      ) : null}
      <Container mt={0} p={0} w={300} h={200}>
        {displayType === DisplayType.MONTH ? <DailyTable /> : null}
        {displayType === DisplayType.DAY ? <DailyBox /> : null}
      </Container>
    </>
  );
};

export default DailyContainer;
