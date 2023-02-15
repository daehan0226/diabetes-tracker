import React, { FC } from "react";
import { Text } from "@mantine/core";
import { MealType } from "../../../@types";

const getWarningNumber = (type: MealType) => {
  switch (type) {
    case MealType.Fasting:
      return 100;
    case MealType.Breakfast:
    case MealType.Lunch:
    case MealType.Dinner:
      return 140;
    default:
      return 140;
  }
};

interface TableCellProps {
  number: number;
  type: MealType;
}

const TableCell: FC<TableCellProps> = ({ number, type }) => {
  if (number) {
    return (
      <Text
        sx={{ cursor: "pointer" }}
        color={number > getWarningNumber(type) ? "red" : "black"}
      >
        {number}
      </Text>
    );
  }
  return <Text sx={{ cursor: "pointer" }}>__</Text>;
};
export default TableCell;
