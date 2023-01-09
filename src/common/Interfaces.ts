import { ItemId } from "./enums.js";

export interface ItemInterface {
  id: string;
  turn: number;
  cardCode: ItemId;
}

export interface SlotInterface {
  id: string;
  type: string;
  items: ItemInterface[];
  isEmpty: boolean;
}
export interface BoardManagerInterface {
  milpas: {
    [key: string]: SlotInterface[];
  };
  edges: {
    [key: string]: SlotInterface[];
  };
}
