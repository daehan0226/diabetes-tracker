import React, { FC, useState } from "react";
import { Text, Button, NumberInput } from "@mantine/core";
import { IDailyTrackInfo, MealType } from "../../../@types";
import { createTracking } from "../../../Apis";
import { useAuthState } from "../../../Hookes";

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

const tableCellKey = (date: string, col: MealType) => {
  return `${date}_${col}`;
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
                    autoFocus={true}
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
                <TableCell
                  type={col}
                  number={
                    trackingInfo.find(
                      (info) => info.type === col && info.bloodSugar
                    )?.bloodSugar ?? 0
                  }
                />
              )}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default TableRow;
