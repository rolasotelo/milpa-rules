import { ItemCode, TurnStatus } from "../common/enums.js";
import Item from "./Item.js";
import {
  CardInterface,
  PlayerInterface,
  SlotInterface,
} from "../common/interfaces.js";
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

  public status: TurnStatus;

  private constructor(public readonly firstPlayer: string) {
    this.status = TurnStatus.WAITING;
  }

  public static getInstance(firstPlayer?: string): TurnManager {
    if (!TurnManager.instance && !firstPlayer) {
      throw new Error("First player is required to create a new instance");
    }
    if (!TurnManager.instance && firstPlayer) {
      TurnManager.instance = new TurnManager(firstPlayer);
    }
    return TurnManager.instance;
  }

  public get turn(): number {
    if (this._turn < 0 || this._turn > MAX_TURNS) {
      throw new Error("Turn out of bounds");
    }
    return this._turn;
  }

  public start(): void {
    this._turn = 1;
    this.status = TurnStatus.STARTED;
  }

  // Current player calculator for 2 players
  public currentPlayerId(players: PlayerInterface[]): string {
    if (this._turn === 0) {
      throw new Error("Game has not started yet");
    }
    const isFirstPlayerTurn = this._turn % 2 === 1;
    const notFirstPlayer = players.find((p) => p.id !== this.firstPlayer);
    if (!notFirstPlayer) {
      throw new Error("Second player not found");
    }
    if (isFirstPlayerTurn) {
      return this.firstPlayer;
    }
    return notFirstPlayer.id;
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
