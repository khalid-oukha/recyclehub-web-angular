import {WasteType} from "./WasteType";

export interface WasteItem {
  type: WasteType;
  weight: number;
  points: number;
}
