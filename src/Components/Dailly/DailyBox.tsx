import React, { FC } from "react";
import { Container, ScrollArea, Title, Badge, Text, Flex } from "@mantine/core";
import { IDailyTrackInfo } from "../../@types/IDailyTrackingInfo";
interface DailyBoxProps extends IDailyTrackInfo {}

const DailyBox: FC<DailyBoxProps> = ({ trackingInfo, date }) => {
  return (
    <Container>
      {/* <Title order={5}>{date}</Title> */}
      <Badge color="pink" variant="light">
        {date}
      </Badge>
      <ScrollArea>
        <Flex>
          {trackingInfo.map((info, index) => (
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
