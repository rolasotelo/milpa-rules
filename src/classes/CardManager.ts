import { CardInterface } from "../common/Interfaces.js";
import { CardCode } from "../common/enums.js";
import CARDS_RULES from "../common/rules.js";

/**
 * @class CardManager
 * @classdesc Manages the creation of cards and decks. Additionally, it knows how to get the rules of each card.
 * @property {CanCardBePlayed} canCardBePlayed - A function that returns if a card can be played in a slot.
 * @property {PlayCard} getCardSlotInteractor - A function that returns the function that plays a card in a slot.
 * @since 1.0.0
 */

class CardManager {
  static createCard(code: CardCode): CardInterface {
    return {
      id: Math.random().toString(36).substring(2, 15),
      code,
    };
  }

  static getCardSlotInteractor(code: CardCode) {
    return CARDS_RULES[code].playCard;
  }

  static getCanCardBePlayed(code: CardCode) {
    return CARDS_RULES[code].canCardBePlayed;
  }
}

export default CardManager;
