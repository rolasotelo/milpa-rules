import { ItemId } from "./enums.js";

export interface ItemPlayedInTurn {
  id: string;
  turn: number;
  cardCode: ItemId;
}
