import React, { FC } from "react";
import { ITrackingInfo } from "../../@types/ITrackingInfo";

interface DailyBoxProps {
  trackingInfo: ITrackingInfo[];
}

const DailyBox: FC<DailyBoxProps> = ({ trackingInfo }) => {
  return (
    <div>
      {trackingInfo.map((info) => (
        <div key={info.type}>
          <div>{info.type}</div>
          <div>{info.bloodSugar}</div>
        </div>
      ))}
    </div>
  );
};

export default DailyBox;
