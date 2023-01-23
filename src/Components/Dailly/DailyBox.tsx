import React, { FC, useState, useEffect } from "react";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useAuthState } from "../../Hookes";
import { getTrackingBy } from "../../Apis";
import { setDateFormat } from "../../Helper";
import { ITrackingInfoDoc } from "../../@types";
import { OrderByArray } from "../../Helper/sortHelper";

const DailyBox: FC = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [data, setData] = useState<ITrackingInfoDoc[]>([]);
  const state = useAuthState();

  useEffect(() => {
    async function fetchTracking() {
      if (date && state.loggedIn) {
        const data = await getTrackingBy(state.userId, setDateFormat(date));
        setData(OrderByArray([...data], "type"));
      }
    }
    fetchTracking();
  }, [date, state.loggedIn]);

  return (
    <>
      <DatePicker
        mt={20}
        placeholder="Pick date"
        label="Date"
        withAsterisk
        required
        value={date}
        onChange={(date) => setDate(date)}
      />
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
            <Card.Section>
              <Image
                src={`${process.env.REACT_APP_S3_PATH}/${data.imageUrl}`}
                height={160}
                alt={`${data.type}`}
              />
            </Card.Section>
          ) : null}

          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>{data.type}</Text>
            <Badge color="pink" variant="light">
              {data.bloodSugar ? data.bloodSugar : null}
            </Badge>
          </Group>

          <Text size="sm" color="dimmed">
            {data.text}
          </Text>

          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            {data.text}
          </Button>
        </Card>
      ))}
    </>
  );
};

export default DailyBox;
