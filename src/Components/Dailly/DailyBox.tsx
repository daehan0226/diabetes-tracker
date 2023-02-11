import React, { FC, useState, useEffect } from "react";
import {
  Card,
  Image,
  Text,
  Badge,
  Container,
  Group,
  Button,
  Modal,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useNavigate } from "react-router-dom";
import { useAuthState, useRecordState } from "../../Hookes";
import { setDateFormat } from "../../Helper";
import { ITrackingInfoDoc } from "../../@types";
import { OrderByArray } from "../../Helper/sortHelper";

const DailyBox: FC = () => {
  const navigate = useNavigate();
  const [fullImageUrl, setFullImageUrl] = useState<string>("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [data, setData] = useState<ITrackingInfoDoc[]>([]);
  const authState = useAuthState();
  const recordState = useRecordState();

  useEffect(() => {
    async function fetchTracking() {
      if (date && authState.loggedIn) {
        const selectedDateRecords =
          recordState?.data?.filter((r) => r.date === setDateFormat(date)) ??
          [];
        setData(OrderByArray([...selectedDateRecords], "type"));
      }
    }
    fetchTracking();
  }, [date, authState.loggedIn]);

  return (
    <>
      <Modal
        opened={fullImageUrl !== ""}
        onClose={() => setFullImageUrl("")}
        fullScreen
      >
        <Image src={fullImageUrl} width={"100%"} alt={"Full image"} />
      </Modal>
      <DatePicker
        m={20}
        placeholder="Pick date"
        label="Date"
        withAsterisk
        required
        value={date}
        onChange={(date) => setDate(date)}
      />
      <Button m={16} onClick={() => navigate("/form")}>
        {"Add Image"}
      </Button>
      {data.map((data) => (
        <Card
          key={`${date}_${data.type}`}
          shadow="sm"
          p="lg"
          radius="md"
          withBorder
          m={10}
        >
          {data.imageUrl ? (
            <Card.Section sx={{ position: "relative" }}>
              <Image
                src={`${process.env.REACT_APP_S3_PATH}/${data.imageUrl}`}
                height={160}
                alt={`${data.type}`}
              />
              <Button
                sx={{ position: "absolute", right: 10, top: 10, opacity: 0.9 }}
                w={30}
                p={0}
                h={30}
                onClick={() =>
                  setFullImageUrl(
                    `${process.env.REACT_APP_S3_PATH}/${data.imageUrl}`
                  )
                }
              >
                +
              </Button>
            </Card.Section>
          ) : null}

          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>{data.type}</Text>
            {data.bloodSugar ? (
              <Badge color="pink" variant="light" size={"lg"}>
                {data.bloodSugar}
              </Badge>
            ) : null}
          </Group>

          {data.text ? (
            <Container
              mt="md"
              bg="rgb(231, 245, 255)"
              mih={40}
              p={10}
              sx={{ borderRadius: 5 }}
            >
              <Text
                size="sm"
                color="rgb(34, 139, 230)"
                sx={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  wordWrap: "break-word",
                }}
              >
                {data.text}{" "}
              </Text>
            </Container>
          ) : null}
        </Card>
      ))}
    </>
  );
};

export default DailyBox;
