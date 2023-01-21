import React, { FC, useState } from "react";
import { MealType } from "../../@types/enums";
import { Button, FileButton } from "@mantine/core";

const DailyForm: FC = () => {
  const [file, setFile] = useState<File | null>(null);
  return (
    <div>
      <h4>{MealType.Fasting}</h4>
      <input type="number" defaultValue={80} min={0} max={1000}></input>
      <FileButton onChange={setFile} accept="image/png,image/jpeg">
        {(props) => <Button {...props}>Upload image</Button>}
      </FileButton>
      <Button>Save</Button>

      <h4>{MealType.Breakfast}</h4>
      <input type="number" defaultValue={100} min={0} max={1000}></input>
      <Button>Save</Button>

      <h4>{MealType.Lunch}</h4>
      <input type="number" defaultValue={100} min={0} max={1000}></input>
      <Button>Save</Button>

      <h4>{MealType.Snack}</h4>
      <input type="number" defaultValue={100} min={0} max={1000}></input>
      <Button>Save</Button>
    </div>
  );
};

export default DailyForm;
