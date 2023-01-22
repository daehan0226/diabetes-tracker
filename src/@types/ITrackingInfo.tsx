import { MealType } from "./";

export interface ITrackingInfo {
  id?: string;
  time: number;
  date: string;
  type?: MealType;
  text?: string;
  bloodSugar?: number;
  imageUrl?: string;
}
