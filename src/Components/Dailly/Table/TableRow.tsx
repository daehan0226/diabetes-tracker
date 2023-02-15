import React, { FC, useState } from "react";
import { Button, NumberInput } from "@mantine/core";
import { IDailyTrackInfo, ITrackingInfo, MealType } from "../../../@types";
import { createTracking } from "../../../Apis";
import { useAuthState, useRecordDispatch } from "../../../Hookes";
import { useNavigate } from "react-router-dom";
import TableCell from "./TableCell";

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
  const navigate = useNavigate();
  const [bloodSugar, setBloodSugar] = useState<number>(0);
  const [editEle, setEditEle] = useState<string>("");
  const recordDispatch = useRecordDispatch();

  const handleSubmit = async (date: string, type: MealType) => {
    const data: ITrackingInfo = {
      date,
      type,
      bloodSugar,
    };
    const result = await createTracking(state.userId, data);
    if (result) {
      recordDispatch({ type: "ADD_DATA", data });
      setEditEle("");
      refresh();
    }
  };
  return (
    <>
      {data.map(({ date, trackingInfo }) => (
        <tr key={date}>
          <td
            style={{ cursor: "pointer" }}
            onClick={() =>
              navigate("/result/daily", { state: { date: new Date(date) } })
            }
          >
            {date.slice(2, 10)}
          </td>
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
