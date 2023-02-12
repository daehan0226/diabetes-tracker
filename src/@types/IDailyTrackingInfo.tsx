import { ITrackingInfo } from "./";
export interface IDailyTrackInfo {
  trackingInfo: ITrackingInfo[];
  date: string;
}

export interface IDailyObject {
  date: string;
  fasting?: number;
  breakfast?: number;
  lunch?: number;
  dinner?: number;
}
