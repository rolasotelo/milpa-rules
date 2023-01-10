import { ItemCode } from "../common/enums.js";
import Item from "./Item.js";
import { CardInterface, SlotInterface } from "../common/Interfaces.js";
import CardManager from "./CardManager.js";

/**
 * @class TurnManager
 * @description Manages turns and items crafted in each turn
 * @since 1.0.0
 */

class TurnManager {
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
