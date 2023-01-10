import { CardWithoutIdInterface } from "./interfaces.js";
import { CardCode } from "./enums.js";
import { CORN_CARD_INFO } from "./cards.js";

export const CARDS_INFO: { [key: string]: CardWithoutIdInterface } = {
  [CardCode.CORN]: CORN_CARD_INFO,
};

export const MAX_PLAYERS = 2;

export const MAX_TURNS = 16;

export const HAND_SIZE_PER_PLAYER = 2;

export const DECK_SIZE_PER_PLAYER = 32;
