import { MealType } from "./enums";

export interface ITrackingInfo {
  type: MealType;
  time: number;
  text?: string;
  bloodSugar?: number;
  imageUrl?: string;
}
