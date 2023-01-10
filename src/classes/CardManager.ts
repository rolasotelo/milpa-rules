import {
  CardInterface,
  CardWithoutIdInterface,
  PlayerInterface,
} from "../common/interfaces.js";
import { CardCode } from "../common/enums.js";
import CARDS_RULES from "../common/rules.js";

/**
 * @class CardManager
 * @classdesc Manages the creation of cards and decks. Additionally, it knows how to get the rules of each card.
 * @property {CanCardBePlayed} canCardBePlayed - A function that returns if a card can be played in a slot.
 * @property {PlayCard} getCardSlotInteractor - A function that returns the function that plays a card in a slot.
 * @since 1.0.0
 */

const INITIAL_DISPLAY = {
  name: "Get ready",
  description: "welcome",
  summary: "let the game begin",
};

class CardManager {
  private static instance: CardManager;

  public currentCard: CardInterface | null = null;

  public placeholderDisplay = INITIAL_DISPLAY;

  private constructor(
    playersById: { [id: string]: PlayerInterface },
    firstPlayer: string
  ) {
    // Welcoming message for both players
    // Player names
    const playerNames = Object.values(playersById).map((p) => p.name);
    const firstPlayerName = playersById[firstPlayer].name;
    const message1 = `Welcome ${playerNames.join(" and ")}!`;
    const message2 = `${firstPlayerName} starts the game`;
    this.placeholderDisplay = {
      name: "Get ready",
      description: message1,
      summary: message2,
    };
  }

  public static getInstance(
    playersById: { [id: string]: PlayerInterface },
    firstPlayer: string
  ): CardManager {
    if (!CardManager.instance) {
      CardManager.instance = new CardManager(playersById, firstPlayer);
    }
    return CardManager.instance;
  }

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
