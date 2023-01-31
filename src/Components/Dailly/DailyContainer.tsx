import React, { FC, useState } from "react";
import DailyBox from "./DailyBox";
import DailyTable from "./DailyTable";
import { Button, Container, Flex } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { DisplayType } from "../../@types";

const DailyContainer: FC = () => {
  const navigate = useNavigate();
  const [displayType, setDisplayType] = useState<DisplayType>(
    DisplayType.MONTH
  );

  return (
    <Container mt={0} p={0}>
      <Button m={16} onClick={() => navigate("/form")}>
        {"Add"}
      </Button>
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
      {displayType === DisplayType.MONTH ? <DailyTable /> : null}
      {displayType === DisplayType.DAY ? <DailyBox /> : null}
      {displayType === DisplayType.GRAPH ? <>....</> : null}
    </Container>
  );
};

export default DailyContainer;
