import React, { FC } from "react";
import { Container, ScrollArea, Badge, Text, Flex } from "@mantine/core";
import { ITrackingInfo } from "../../@types";
interface DailyBoxProps {
  date: string;
  data: ITrackingInfo[];
}

const DailyBox: FC<DailyBoxProps> = ({ date, data }) => {
  return (
    <Container>
      <Badge color="pink" variant="light">
        {date}
      </Badge>
      <ScrollArea>
        <Flex>
          {data.map((info, index) => (
            <Container sx={{ textAlign: "center", height: 150 }} key={index}>
              <Text fz="md">{info.type}</Text>
              {info.bloodSugar ? (
                <Text fz="lg">{info.bloodSugar}</Text>
              ) : (
                <img
                  src={info.imageUrl}
                  width="100px"
                  height="100px"
                  alt=""
                  style={{
                    borderRadius: "50%",
                  }}
                />
              )}
              {info.text && <Text>text</Text>}
            </Container>
          ))}
        </Flex>
      </ScrollArea>
    </Container>
  );
};

export default DailyBox;