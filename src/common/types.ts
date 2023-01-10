import { ItemCode } from "./enums.js";
import { CardInterface, ItemInterface, SlotInterface } from "./Interfaces.js";

export type ItemBuilder = (
  id: string,
  cardCode: ItemCode,
  turn: number
) => ItemInterface;

export type PlayCard = (
  card: CardInterface,
  slot: SlotInterface,
  turn: number
) => ItemInterface[];

export type CanCardBePlayed = (
  card: CardInterface,
  slot: SlotInterface,
  turn: number
) => boolean;

export type CardRule = {
  playCard: PlayCard;
  canCardBePlayed: CanCardBePlayed;
};

export type CardRules = {
  [key in ItemCode]: CardRule;
};

export type WhereCanCardBePlayedReturn = {
  milpas: {
    [key: string]: boolean[];
  };

  edges: {
    [key: string]: boolean[];
  };
};
