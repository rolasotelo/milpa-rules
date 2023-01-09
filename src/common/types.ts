import { ItemId } from "./enums.js";
import { ItemPlayedInTurn } from "./Interfaces.js";

export type ItemBuilder = (
  id: string,
  cardCode: ItemId,
  turn: number
) => ItemPlayedInTurn;
