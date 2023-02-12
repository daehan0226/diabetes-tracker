import React, { FC, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  IDailyObject,
  IDailyTrackInfo,
  ITrackingInfo,
  ITrackingInfoDoc,
  MealType,
} from "../../../@types";
import { setDailyObjectArray } from "../../../Helper";
import { useRecordState } from "../../../Hookes";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const LineChartComponent: FC = () => {
  const [data, setData] = useState<IDailyObject[]>([]);
  const recordState = useRecordState();

  // useEffect(() => {
  //   setData([...recordState.data.filter((r) => r.type === type)]);
  // }, [type, recordState.data]);

  useEffect(() => {
    async function fetchTracking() {
      if (recordState.data) {
        console.log(setDailyObjectArray(recordState.data));
        setData([...setDailyObjectArray(recordState.data)]);
      }
    }
    fetchTracking();
  }, [recordState.data]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey={MealType.Fasting.toLowerCase()}
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey={MealType.Breakfast.toLowerCase()}
          stroke="#82ca9d"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey={MealType.Lunch.toLowerCase()}
          stroke="#aa2e25"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey={MealType.Dinner.toLowerCase()}
          stroke="#ffeb3b"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
