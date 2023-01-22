import React, { FC, useEffect, useState } from "react";
import { ITrackingInfo, IDailyTrackInfo } from "../../@types";
import DailyBox from "./DailyBox";
import DailyTable from "./DailyTable";
import { Button, Container } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { getTracking } from "../../Apis";
import { getEmail } from "../../Hepler";

const sort = (a: ITrackingInfo, b: ITrackingInfo) => {
  if (a.time && b.time) {
    return a.time - b.time;
  }
  return -1;
};

const DailyContainer: FC = () => {
  const navigate = useNavigate();
  const [displayTable, setDisplayTable] = useState<boolean>(false);
  const [data, setData] = useState<IDailyTrackInfo[]>([]);

  useEffect(() => {
    async function fetchTracking() {
      const email = getEmail();
      const data = await getTracking(email);
      const dates = Array.from(new Set(data.map((item: any) => item.date)));
      let format: IDailyTrackInfo[] = [];
      for (const date of dates) {
        format.push({
          date,
          trackingInfo: data.filter((d) => d.date === date).sort(sort),
        });
      }
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
      {displayTable ? (
        <DailyTable data={data} />
      ) : (
        <>
          {data.map((data, index) => (
            <DailyBox
              key={index}
              date={data.date}
              data={data.trackingInfo}
            ></DailyBox>
          ))}
        </>
      )}
    </Container>
  );
};

export default DailyContainer;
