import { ItemId } from "../common/enums.js";
import Item from "./Item.js";

/**
 * @class TurnManager
 * @description Manages turns and items crafted in each turn
 * @since 1.0.0
 */

class TurnManager {
  public static createItem(id: string, cardCode: ItemId, turn: number): Item {
    return new Item(cardCode, turn, id);
  }
}

export default TurnManager;
