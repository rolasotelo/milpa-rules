import { ItemCode, TurnStatus } from "../common/enums.js";
import Item from "./Item.js";
import { CardInterface, SlotInterface } from "../common/Interfaces.js";
import CardManager from "./CardManager.js";
import { MAX_TURNS } from "../common/constants.js";

/**
 * @class TurnManager
 * @description Manages turns and items crafted in each turn
 * @property {number} turn - current turn
 * @property {string} status - current status of the game
 * @since 1.0.0
 */

class TurnManager {
  private static instance: TurnManager;

  private _turn = 0;

  public status: string;

  private constructor() {
    this.status = TurnStatus.STARTED;
  }

  public static getInstance(): TurnManager {
    if (!TurnManager.instance) {
      TurnManager.instance = new TurnManager();
    }
    return TurnManager.instance;
  }

  public get turn(): number {
    if (this._turn < 0 || this._turn > MAX_TURNS) {
      throw new Error("Turn out of bounds");
    }
    return this._turn;
  }

  public static createItem(
    cardCode: ItemCode,
    turn: number,
    id?: string
  ): Item {
    return new Item(cardCode, turn, id);
  }

  public static playCard(
    card: CardInterface,
    slot: SlotInterface,
    turn: number
  ): void {
    const interactor = CardManager.getCardSlotInteractor(card.code);
    // TODO: instead of pushing cards, set all as new?
    const cardsToPush = interactor(card, slot, turn);
    slot.addItems(cardsToPush);
  }
}

export default TurnManager;
