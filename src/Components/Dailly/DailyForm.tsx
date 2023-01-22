import React, { FC, useState, useEffect } from "react";
import { DailyFormType, MealType } from "../../@types";
import {
  Button,
  FileButton,
  Select,
  TextInput,
  Flex,
  Container,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { createTracking } from "../../Apis";
import { useNavigate } from "react-router-dom";
import { isValid } from "../../Hepler";

interface DailyFormProps {
  formType: DailyFormType;
}

const DailyForm: FC<DailyFormProps> = ({ formType }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<MealType>(MealType.Fasting);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<number>(0);
  const [text, setText] = useState<string>("");
  const [bloodSugar, setBloodSugar] = useState<number>(80);
  const [file, setFile] = useState<File | null>(null);

  // useEffect(() => {
  // 검증 로직 추가 필요
  //   console.log(type, file, bloodSugar, date, time);
  // }, [type, file, bloodSugar, date, time, text]);

  useEffect(() => {
    const isTokenValid = isValid();
    if (!isTokenValid) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    // 검증 로직 추가 필요
    const result = await createTracking({
      date,
      type,
      bloodSugar,
      time,
      text,
    });
    setLoading(false);
    if (result) {
      navigate("/result");
    }
  };
  const setDateFormat = (date: Date | null) => {
    if (date) {
      const y = String(date.getFullYear());
      let m = String(date.getMonth() + 1);
      let d = String(date.getDate());
      if (m.length === 1) {
        m = `0${m}`;
      }
      if (d.length === 1) {
        d = `0${d}`;
      }
      setDate(`${y}-${m}-${d}`);
    } else {
      setDate("");
    }
  };

  const setMealType = (value: MealType) => {
    if (value) {
      setType(value);
    }
  };

  return (
    <Container size={400}>
      <DatePicker
        mt={20}
        placeholder="Pick date"
        label="Date"
        withAsterisk
        required
        onChange={(date) => setDateFormat(date)}
      />
      <TextInput
        mt={20}
        required
        label="Time"
        placeholder="0000-2400"
        maxLength={4}
        onChange={(event) => setTime(Number(event.currentTarget.value))}
      />
      <Select
        label="Meal"
        placeholder="Fasting"
        onChange={setMealType}
        value={type}
        data={Object.values(MealType)}
        mt={20}
        required
      />

      {formType === DailyFormType.BloodSugar && (
        <TextInput
          mt={20}
          required
          placeholder={"80"}
          label="Blood Sugar Level"
          type={"number"}
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
        {formType === DailyFormType.Image && (
          <FileButton onChange={setFile} accept="image/png,image/jpeg">
            {(props) => <Button {...props}>Upload image</Button>}
          </FileButton>
        )}
        <Button
          loading={loading}
          onClick={() => {
            handleSubmit();
          }}
        >
          Save
        </Button>
      </Flex>
    </Container>
  );
};

export default DailyForm;
