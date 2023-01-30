import React, { FC, useState } from "react";
import { Table } from "@mantine/core";
import { IDailyTrackInfo, ITrackingInfo, MealType } from "../../@types";
import { Button, NumberInput } from "@mantine/core";
import { createTracking, getTracking } from "../../Apis";
import { useAuthState } from "../../Hookes";
import { OrderByArray, setDateFormat } from "../../Helper";
import { DatePicker } from "@mantine/dates";

interface DailyTableProps {
  data: IDailyTrackInfo[];
  refresh: () => {};
}

const tableCols = [
  MealType.Fasting,
  MealType.Breakfast,
  MealType.Lunch,
  MealType.Dinner,
];

const tableCellKey = (date: string, col: MealType) => {
  return `${date}_${col}`;
};

const TableRow: FC<DailyTableProps> = ({ data, refresh }) => {
  const state = useAuthState();
  const [bloodSugar, setBloodSugar] = useState<number>(0);
  const [editEle, setEditEle] = useState<string>("");

  const handleSubmit = async (date: string, type: MealType) => {
    await createTracking(state.userId, {
      date,
      type,
      bloodSugar,
    });
    setEditEle("");
    refresh();
  };

  return (
    <>
      {data.map(({ date, trackingInfo }) => (
        <tr key={date}>
          <td>{date}</td>
          {tableCols.map((col) => (
            <td
              key={tableCellKey(date, col)}
              onClick={() => {
                setEditEle(tableCellKey(date, col));
              }}
            >
              {editEle === tableCellKey(date, col) ? (
                <>
                  <NumberInput
                    sx={{ width: 70 }}
                    min={0}
                    max={500}
                    value={
                      trackingInfo.find(
                        (info) => info.type === col && info.bloodSugar
                      )?.bloodSugar ?? 0
                    }
                    onChange={(value) => setBloodSugar(Number(value))}
                  />
                  <Button mt={10} onClick={() => handleSubmit(date, col)}>
                    Save
                  </Button>
                </>
              ) : (
                <>
                  {trackingInfo.find(
                    (info) => info.type === col && info.bloodSugar
                  )?.bloodSugar ?? (
                    <Button sx={{ cursor: "pointer" }}>Edit</Button>
                  )}
                </>
              )}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

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

const DailyTable: FC = () => {
  const [data, setData] = useState<IDailyTrackInfo[]>([]);
  const [addDate, setAddDate] = useState<Date>(new Date());
  const state = useAuthState();

  React.useEffect(() => {
    async function fetch() {
      await fetchTracking(addDate);
    }
    fetch();
  }, []);

  const fetchTracking = async (addDate?: Date) => {
    const data = await getTracking(state.userId);
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
        mt={20}
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
      <Table withBorder withColumnBorders>
        <thead>
          <tr>
            <th>Date</th>
            <th>Fasting</th>
            <th>Breakfast</th>
            <th>Lunch</th>
            <th>Dinner</th>
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
