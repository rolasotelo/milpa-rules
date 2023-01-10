import { CardInterface } from "../common/interfaces.js";
import {
  DECK_SIZE_PER_PLAYER,
  HAND_SIZE_PER_PLAYER,
} from "../common/constants.js";
import { CardCode } from "../common/enums.js";
import CardManager from "./CardManager.js";

/**
 * @class DeckManager
 * @classdesc Manages the deck of cards, and the hand from which the players can choose.
 * @property {CardInterface[]} deck - the deck of cards
 * @property {CardInterface[]} hand - the hand of cards
 * @since 1.0.0
 */

const DECK_BLUEPRINT: [CardCode, number][] = [
  [CardCode.CORN, 4],
  [CardCode.BEANS, 4],
];

class DeckManager {
  private static instance: DeckManager;

  private deck: CardInterface[] = [];

  public hand: CardInterface[] = [];

  public readonly DECK_SIZE: number = 0;

  public readonly HAND_SIZE: number = 0;

  private constructor(public readonly playerCount: number) {
    this.DECK_SIZE = playerCount * DECK_SIZE_PER_PLAYER;
    this.HAND_SIZE = playerCount * HAND_SIZE_PER_PLAYER;
  }

  public static getInstance(playerCount: number): DeckManager {
    if (!DeckManager.instance && !playerCount) {
      throw new Error("Player count is required to create a new instance");
    }
    if (!DeckManager.instance && playerCount) {
      DeckManager.instance = new DeckManager(playerCount);
    }
    return DeckManager.instance;
  }

  // shuffle deck
  private static shuffle(deck: CardInterface[]): void {
    for (let i = deck.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }

  // create deck
  private static createDeck(): CardInterface[] {
    const deck: CardInterface[] = [];
    DECK_BLUEPRINT.forEach(([cardCode, quantity]) => {
      for (let i = 0; i < quantity; i += 1) {
        deck.push(CardManager.createCard(cardCode));
      }
    });
    return deck;
  }

  public initDecks(): void {
    this.deck = DeckManager.createDeck();
    DeckManager.shuffle(this.deck);
  }

  public drawHand(): void {
    this.hand = this.deck.splice(0, this.HAND_SIZE);
  }

  public deleteCardFromHand(cardId: string): void {
    const cardIndex = this.hand.findIndex((c) => c.id === cardId);
    if (cardIndex === -1) {
      throw new Error("Card not found in hand");
    }
    this.hand.splice(cardIndex, 1);
  }
}

export default DeckManager;
