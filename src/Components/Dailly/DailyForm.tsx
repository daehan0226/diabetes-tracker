import React, { FC, useState, useEffect } from "react";
import { MealType } from "../../@types";
import {
  Button,
  FileButton,
  TextInput,
  Flex,
  Container,
  Image,
  Title,
  NumberInput,
} from "@mantine/core";
import { createTracking, uploadFile, getTrackingBy } from "../../Apis";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../../Hookes";
import { setDateFormat } from "../../Helper";

interface DailyFormProps {
  date: Date;
  type: MealType;
}

const DailyForm: FC<DailyFormProps> = ({ date, type }) => {
  const state = useAuthState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [bloodSugar, setBloodSugar] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);

  // useEffect(() => {
  // 검증 로직 추가 필요
  //   console.log(type, file, bloodSugar, date, time);
  // }, [type, file, bloodSugar, date, time, text]);

  useEffect(() => {
    if (!state.loggedIn) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    async function fetchDoc() {
      const [doc, ...rest] = await getTrackingBy(
        state.userId,
        setDateFormat(date),
        type
      );
      if (doc) {
        const { text, imageUrl, bloodSugar } = doc;
        if (text) setText(text);
        if (imageUrl) setImageUrl(imageUrl);
        if (bloodSugar) {
          setBloodSugar(bloodSugar);
        }
      }
    }
    fetchDoc();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    // 검증 로직 추가 필요

    let newImageUrl;
    if (file) {
      newImageUrl = await uploadFile(state.userId, file);
    }
    const result = await createTracking(state.userId, {
      date: setDateFormat(date),
      type,
      bloodSugar,
      imageUrl: newImageUrl ?? imageUrl,
      text,
    });
    setLoading(false);
    if (result) {
      navigate("/result");
    }
  };

  return (
    <Container size={400}>
      <Title order={4} color="blue" align="center">
        {setDateFormat(date)} - {type}
      </Title>
      <NumberInput
        mt={20}
        min={0}
        max={500}
        value={bloodSugar || 0}
        label="Blood Sugar Level"
        onChange={(value) => setBloodSugar(value || 0)}
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
            <Button
              onClick={() => {
                setFile(null);
              }}
            >
              Delete image
            </Button>
          </>
        )}
        {imageUrl && (
          <>
            <Image
              radius="md"
              src={`${process.env.REACT_APP_S3_PATH}/${imageUrl}`}
              alt="Preview image"
            />
            <Button
              onClick={() => {
                // delete from s3
                setImageUrl("");
              }}
            >
              Delete image
            </Button>
          </>
        )}
        {!file && !imageUrl && (
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
