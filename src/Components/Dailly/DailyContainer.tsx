import React, { FC, useState } from "react";
import DailyBox from "./DailyBox";
import DailyTable from "./DailyTable";
import { Button, Container } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const DailyContainer: FC = () => {
  const navigate = useNavigate();
  const [displayTable, setDisplayTable] = useState<boolean>(false);

  return (
    <Container mt={0} p={0}>
      <Button m={16} onClick={() => navigate("/form")}>
        {"Add"}
      </Button>
      <Button m={16} onClick={() => setDisplayTable(!displayTable)}>
        {displayTable ? "With images" : "Only numbers"}
      </Button>
      {displayTable ? <DailyTable /> : <DailyBox />}
    </Container>
  );
};

export default DailyContainer;
