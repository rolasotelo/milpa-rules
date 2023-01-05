import { ItemId } from "../common/enums.js";

class Item {
    constructor(public id: ItemId, public turn: number) {}

    get stringifyItem(): string {
        return `${this.id}@${this.turn}`;
    }
}

export default Item;