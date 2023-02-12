import React, { FC, useState } from "react";
import { Table } from "@mantine/core";
import { IDailyTrackInfo, ITrackingInfo, MealType } from "../../@types";
import { useAuthState, useRecordState } from "../../Hookes";
import { OrderByArray, setDateFormat } from "../../Helper";
import { DatePicker } from "@mantine/dates";
import { TableRow } from "./Table";

const setDailyData = (
  data: ITrackingInfo[],
  addDate?: Date
): IDailyTrackInfo[] => {
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
  if (addDate) {
    const date = setDateFormat(addDate);
    if (!dates.includes(date)) {
      format.push({
        date,
        trackingInfo: [],
      });
    }
  }
  format.sort((a, b) => (a.date > b.date ? -1 : 1));
  return format;
};

const minDate = "2023-01-01";
const cols = ["Date", "Fasting", "Breakfast", "Lunch", "Dinner"];

const DailyTable: FC = () => {
  const [data, setData] = useState<IDailyTrackInfo[]>([]);
  const [addDate, setAddDate] = useState<Date>(new Date());
  const recordState = useRecordState();

  React.useEffect(() => {
    async function fetch() {
      await fetchTracking(addDate);
    }
    fetch();
  }, [recordState.data]);

  const fetchTracking = async (addDate?: Date) => {
    const data = recordState.data;
    setData([...setDailyData(data, addDate)]);
  };

  React.useEffect(() => {
    async function addDateHandler() {
      await fetchTracking(addDate);
    }
    addDateHandler();
  }, [addDate]);

  return (
    <>
      <DatePicker
        m={20}
        label="Add date"
        withAsterisk
        required
        value={addDate}
        onChange={(date) => {
          if (date) setAddDate(date);
        }}
        minDate={new Date(minDate)}
        maxDate={new Date()}
      />
      <Table withBorder withColumnBorders>
        <thead>
          <tr>
            {cols.map((col) => (
              <th key={`table-col-${col}`}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <TableRow data={data} refresh={fetchTracking} />
        </tbody>
      </Table>
    </>
  );
};

export default DailyTable;
