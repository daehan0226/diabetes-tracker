import React, { FC, useState, useEffect } from "react";
import { DailyFormType, MealType } from "../../@types/enums";
import {
  Button,
  FileButton,
  Select,
  TextInput,
  Flex,
  Container,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";

interface DailyFormProps {
  formType: DailyFormType;
}

const DailyForm: FC<DailyFormProps> = ({ formType }) => {
  const [type, setType] = useState<string | null>(null);
  const [date, setDate] = useState<number | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [bloodSugar, setBloodSugar] = useState<number>(80);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    console.log(type, file, bloodSugar, date, time);
  }, [type, file, bloodSugar, date, time]);

  return (
    <Container size={400}>
      <DatePicker
        mt={20}
        placeholder="Pick date"
        label="Date"
        withAsterisk
        required
        onChange={(date) => setDate(date?.getTime())}
      />
      <TextInput
        mt={20}
        required
        label="Time"
        placeholder="00:00 - 24:00"
        value={time}
        maxLength={5}
        onChange={(event) => setTime(event.currentTarget.value)}
      />
      {formType === DailyFormType.Image && (
        <Select
          label="Meal"
          placeholder="Fasting"
          onChange={setType}
          value={type}
          data={Object.values(MealType)}
          mt={20}
          required
        />
      )}

      {formType === DailyFormType.BloodSugar && (
        <TextInput
          mt={20}
          required
          label="Blood Sugar Level"
          type={"number"}
          value={bloodSugar}
          onChange={(event) => setBloodSugar(Number(event.currentTarget.value))}
        />
      )}
      <TextInput
        mt={20}
        label="Any comments"
        placeholder="..."
        value={text}
        onChange={(event) => setText(event.currentTarget.value)}
      />
      <Flex
        m={20}
        p={10}
        gap="md"
        justify="center"
        align="center"
        direction="column"
      >
        <FileButton onChange={setFile} accept="image/png,image/jpeg">
          {(props) => <Button {...props}>Upload image</Button>}
        </FileButton>
        <Button>Save</Button>
      </Flex>
    </Container>
  );
};

export default DailyForm;
