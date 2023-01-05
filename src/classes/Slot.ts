import { SlotType } from "../common/enums.js";
import Item from "./Item.js";

export class Slot {
    name: string = 'Rolando Sotelo Alarcon'
    // number from 1 to 16 to represent the position of the slot
    position: number;

    // type of the slot, either milpa or edge (at the moment)
    type: SlotType;

    items: Item[] = [];

    constructor(
        position: number,
        type: SlotType,
        items?: Item[]
    ) {
        this.position = position;
        this.type = type;
        this.items = items || [];
    }

}