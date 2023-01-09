import { SlotType } from "../common/enums.js";
import { ItemInterface, SlotInterface } from "../common/Interfaces.js";

/**
 * @class Slot
 * @description Represents a slot in the board, where cards can be played
 * @property {string} id - Slot id
 * @property {SlotType} type - Slot type, either "milpa" or "edge". The Slot type can activate or deactivate some effects in items and cards, or even prevent the use of some cards.
 * @property {Item[]} items - Items contained in the slot
 * @property {number} boardPosition - Slot position in the board. A number between 1 and 16
 * @since 1.0.0
 */

class Slot implements SlotInterface {
  public readonly id: string;

  items: ItemInterface[] = [];

  constructor(
    public readonly boardPosition: number,
    public readonly type: SlotType,
    items?: ItemInterface[]
  ) {
    this.items = items || [];
    // generate Slot id randomly
    this.id = Math.random().toString(36).substring(2, 15);
  }

  get isEmpty(): boolean {
    return this.items.length === 0;
  }

  addItems(items: ItemInterface[]): void {
    this.items.push(...items);
  }

  deleteItem(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
  }

  private checkBoardPosition() {
    if (this.boardPosition < 1 || this.boardPosition > 16) {
      throw new Error("Board position is out of range");
    }
  }

  get row(): number {
    this.checkBoardPosition();
    if (this.type === SlotType.EDGE) {
      throw new Error("Edge slots don't have a row");
    }
    return Math.ceil(this.boardPosition / 4);
  }

  get column(): number {
    this.checkBoardPosition();
    if (this.type === SlotType.EDGE) {
      throw new Error("Edge slots don't have a column");
    }
    if (this.boardPosition % 4 === 0) {
      return 4;
    }
    return this.boardPosition % 4;
  }

  get edge(): [number, string] {
    this.checkBoardPosition();
    if (this.type === SlotType.MILPA) {
      throw new Error("Milpa slots don't have an edge");
    }
    const edges = ["top", "right", "bottom", "left"];
    const edge = Math.ceil(this.boardPosition / 4);
    return [edge, edges[edge - 1]];
  }

  get position(): number {
    this.checkBoardPosition();
    if (this.type === SlotType.MILPA) {
      throw new Error(
        "Milpa slots don't have a position, use column and row instead"
      );
    }
    if (this.boardPosition % 4 === 0) {
      return 4;
    }
    return this.boardPosition % 4;
  }
}

export default Slot;
