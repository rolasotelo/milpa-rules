import { CardWithoutIdInterface } from "./Interfaces.js";
import { CardCode } from "./enums.js";
import { CORN_CARD_INFO } from "./cards.js";

export const CARDS_INFO: { [key: string]: CardWithoutIdInterface } = {
  [CardCode.CORN]: CORN_CARD_INFO,
};

export const MAX_PLAYERS = 2;
