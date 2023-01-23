import React, { FC, useState, useEffect } from "react";
import { DailyFormType, MealType } from "../../@types";
import {
  Button,
  FileButton,
  Select,
  TextInput,
  Flex,
  Container,
  Image,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { createTracking, uploadFile } from "../../Apis";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "../../Hepler";
import { useAuthState } from "../../Hookes";

interface DailyFormProps {
  date: string;
  type: MealType;
}

const DailyForm: FC<DailyFormProps> = ({ date, type }) => {
  const state = useAuthState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [bloodSugar, setBloodSugar] = useState<number | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);

  // useEffect(() => {
  // 검증 로직 추가 필요
  //   console.log(type, file, bloodSugar, date, time);
  // }, [type, file, bloodSugar, date, time, text]);

  useEffect(() => {
    const isValid = isTokenValid();
    if (!isValid) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    // 검증 로직 추가 필요

    let imageUrl;
    if (file) {
      imageUrl = uploadFile(state.userId, file);
    }
    const result = await createTracking({
      date,
      type,
      bloodSugar,
      imageUrl,
      text,
    });
    setLoading(false);
    if (result) {
      navigate("/result");
    }
  };

  return (
    <Container size={400}>
      <TextInput
        mt={20}
        placeholder={"80"}
        label="Blood Sugar Level"
        type={"number"}
        onChange={(event) => setBloodSugar(Number(event.currentTarget.value))}
      />
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
        {file && (
          <>
            <Image
              radius="md"
              src={URL.createObjectURL(file)}
              alt="Preview image"
            />
          </>
        )}
        {file ? (
          <Button
            onClick={() => {
              setFile(null);
            }}
          >
            Delete image
          </Button>
        ) : (
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
