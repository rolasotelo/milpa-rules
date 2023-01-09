import { ItemId } from "./enums.js";
import { ItemInterface } from "./Interfaces.js";

export type ItemBuilder = (
  id: string,
  cardCode: ItemId,
  turn: number
) => ItemInterface;
