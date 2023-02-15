import React, { FC, useState } from "react";
import { Select, Table } from "@mantine/core";
import {
  IDailyTrackInfo,
  ITrackingInfo,
  MealBasicType,
  MealType,
} from "../../@types";
import { useRecordState } from "../../Hookes";
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

const cols = ["Date", "Fasting", "Breakfast", "Lunch", "Dinner"];

const getMonths = () => {
  const currentYear = new Date().getFullYear();
  const maxYearMonth = new Date().toISOString().slice(0, 7);
  const minYear = 2023;
  let result = [];
  let years = [];
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let count = 0;
  while (minYear + count <= currentYear) {
    years.push(minYear);
    count++;
  }
  for (const year of years) {
    for (const month of months) {
      const value = `${String(year)}-${month}`;
      if (value <= maxYearMonth) {
        result.push({
          value,
          label: value,
        });
      }
    }
  }
  return result;
};

const DailyTable: FC = () => {
  const [data, setData] = useState<IDailyTrackInfo[]>([]);
  const [month, setMonth] = useState<string | null>(null);
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
        mb={20}
        label="Add date"
        withAsterisk
        required
        value={addDate}
        onChange={(date) => {
          if (date) setAddDate(date);
        }}
        minDate={new Date("2023-01-01")}
        maxDate={new Date()}
      />
      <Select placeholder="Pick month" data={getMonths()} onChange={setMonth} />
      <Table withBorder withColumnBorders>
        <thead>
          <tr>
            {["Date", ...Object.values(MealBasicType)].map((col) => (
              <th key={`table-col-${col}`}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <TableRow
            data={month ? data.filter((r) => r.date.startsWith(month)) : data}
            refresh={fetchTracking}
          />
        </tbody>
      </Table>
    </>
  );
};

export default DailyTable;
