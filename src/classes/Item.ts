import { ItemId } from "../common/enums.js";

/**
 * @class Item
 * @classdesc Items are contained in a slot. They have their cardCode and turn after the card that generated them and the turn in which they were generated. Items are used to calculate the score of the player.
 * @property {ItemId} _id - The id of the item.
 * @property {number} _turn - The turn in which the item was generated.
 * @property {string} _cardCode - The code of the card that generated the item.
 * @since 1.0.0
 *
 */

class Item {
  private readonly _id: string;

  constructor(
    private readonly _cardCode: ItemId,
    private readonly _turn: number,
    id?: string
  ) {
    // generate Item id randomly
    if (id) {
      this._id = id;
    } else {
      this._id =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
    }
  }

  get id(): string {
    return this._id;
  }

  get cardCode(): ItemId {
    return this._cardCode;
  }

  get turn(): number {
    return this._turn;
  }
}

export default Item;
