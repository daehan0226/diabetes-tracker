import React, { FC, useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  BarChart,
} from "recharts";
import { MealBasicType, MealType } from "../../../@types";
import { useRecordState } from "../../../Hookes";

interface IAverage {
  name: MealBasicType;
  "Blood Sugar Level": number;
}

const AverageComponent: FC = () => {
  const [data, setData] = useState<IAverage[]>([]);
  const recordState = useRecordState();

  useEffect(() => {
    if (recordState.data) {
      let dataByMealType: IAverage[] = [];
      for (const type of Object.values(MealBasicType)) {
        const dataByType = recordState.data
          .filter((r) => String(r.type) === String(type))
          .map((r) => r.bloodSugar ?? 0);
        dataByMealType.push({
          name: type,
          "Blood Sugar Level":
            dataByType.reduce((a, b) => a + b, 0) / dataByType.length,
        });
      }
      setData([...dataByMealType]);
    }
  }, [recordState.data]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Blood Sugar Level" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AverageComponent;
