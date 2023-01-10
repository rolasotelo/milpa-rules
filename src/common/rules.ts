import { CardRule, CardRules } from "./types.js";
import TurnManager from "../classes/TurnManager.js";
import { CardCode, ItemCode, SlotType } from "./enums.js";

const CORN_CARD_RULES: CardRule = {
  playCard: (card, slot, turn) => [TurnManager.createItem(ItemCode.CORN, turn)],
  canCardBePlayed: (card, slot, turn) => slot.type === SlotType.MILPA,
};

const BEANS_CARD_RULES: CardRule = {
  playCard: (card, slot, turn) => [
    TurnManager.createItem(ItemCode.BEANS, turn),
  ],
  canCardBePlayed: (card, slot, turn) => slot.type === SlotType.MILPA,
};

const CARD_RULES: CardRules = {
  [CardCode.CORN]: CORN_CARD_RULES,
  [CardCode.BEANS]: BEANS_CARD_RULES,
};

export default CARD_RULES;
