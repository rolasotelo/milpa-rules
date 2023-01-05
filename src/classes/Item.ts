import { ItemId } from "../common/enums.js";

// Items can be contained in a slot. They have their id generated after the card
// that generated them and the turn in which they were generated.
// Items are the base for generating points in the game.
class Item {
  constructor(public id: ItemId, public turn: number) {}

  get stringifyItem(): string {
    return `${this.id}@${this.turn}`;
  }
}

export default Item;
