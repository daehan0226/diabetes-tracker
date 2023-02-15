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
import { IDailyObject, MealType } from "../../../@types";
import { setDailyObjectArray } from "../../../Helper";
import { useRecordState } from "../../../Hookes";

const LineChartComponent: FC = () => {
  const [data, setData] = useState<IDailyObject[]>([]);
  const recordState = useRecordState();

  useEffect(() => {
    async function fetchTracking() {
      if (recordState.data) {
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
