import React, { FC } from "react";
import { Table } from "@mantine/core";
import { IDailyTrackInfo } from "../../@types/IDailyTrackingInfo";
import { MealType } from "../../@types/enums";

interface DailyTableProps {
  data: IDailyTrackInfo[];
}

const tableCols = [
  MealType.Fasting,
  MealType.Breakfast,
  MealType.Lunch,
  MealType.Dinner,
];

const DailyTable: FC<DailyTableProps> = ({ data }) => {
  const rows = data.map((ele) => (
    <tr key={ele.date}>
      <td>{ele.date}</td>
      {tableCols.map((col) => (
        <td key={col}>
          {ele.trackingInfo.find((info) => info.type === col && info.bloodSugar)
            ?.bloodSugar ?? ""}
        </td>
      ))}
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Fasting</th>
          <th>Breakfast</th>
          <th>Lunch</th>
          <th>Dinner</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default DailyTable;
