import { MealType } from "./";

export interface ITrackingInfo {
  id?: string;
  date: string;
  type?: MealType;
  text?: string;
  bloodSugar?: number;
  imageUrl?: string;
}
