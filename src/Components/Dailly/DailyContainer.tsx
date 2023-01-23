import React, { FC, useEffect, useState } from "react";
import { IDailyTrackInfo, MealType } from "../../@types";
import DailyBox from "./DailyBox";
import DailyTable from "./DailyTable";
import { Button, Container } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { getTracking } from "../../Apis";
import { useAuthState } from "../../Hookes";
import { OrderByArray } from "../../Helper/sortHelper";

const DailyContainer: FC = () => {
  const navigate = useNavigate();
  const state = useAuthState();
  const [displayTable, setDisplayTable] = useState<boolean>(false);
  const [data, setData] = useState<IDailyTrackInfo[]>([]);

  useEffect(() => {
    async function fetchTracking() {
      const data = await getTracking(state.userId);
      const dates = Array.from(new Set(data.map((item: any) => item.date)));
      let format: IDailyTrackInfo[] = [];
      for (const date of dates) {
        format.push({
          date,
          trackingInfo: OrderByArray(
            data.filter((d) => d.date === date),
            "type" as MealType
          ),
        });
      }
      console.log(format);
      setData([...format]);
    }
    fetchTracking();
  }, []);

  return (
    <Container mt={0} p={0}>
      <Button m={16} onClick={() => navigate("/form")}>
        {"Add"}
      </Button>
      <Button m={16} onClick={() => setDisplayTable(!displayTable)}>
        {displayTable ? "With images" : "Only numbers"}
      </Button>
      {displayTable ? <DailyTable data={data} /> : <DailyBox></DailyBox>}
    </Container>
  );
};

export default DailyContainer;
