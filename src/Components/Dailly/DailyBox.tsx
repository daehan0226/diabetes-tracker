import React, { FC } from "react";
import { Container, ScrollArea, Title, Text, Flex } from "@mantine/core";
import { IDailyTrackInfo } from "../../@types/IDailyTrackingInfo";
import { DailyFormType } from "../../@types/enums";

interface DailyBoxProps extends IDailyTrackInfo {
  formType: DailyFormType;
}

const DailyBox: FC<DailyBoxProps> = ({ trackingInfo, date, formType }) => {
  return (
    <Container>
      <Title order={5}>{date}</Title>
      <ScrollArea>
        <Flex>
          {trackingInfo.map((info) => (
            <Container
              sx={{ textAlign: "center", height: 150 }}
              key={info.type}
            >
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
