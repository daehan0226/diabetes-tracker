import { MealType } from "./";

export interface ITrackingInfo {
  type: MealType;
  time: number;
  text?: string;
  bloodSugar?: number;
  imageUrl?: string;
}
