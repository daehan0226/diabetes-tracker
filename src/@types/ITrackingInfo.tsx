import { MealType } from "./enums";

export interface ITrackingInfo {
  type: MealType;
  time: number;
  bloodSugar?: number;
  imageUrl?: string;
}
