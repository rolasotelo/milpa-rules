import TurnManager from "../../src/classes/TurnManager.js";
import { CardCode, ItemCode, SlotType } from "../../src/common/enums.js";
import {
  CardInterface,
  ItemInterface,
  SlotInterface,
} from "../../src/common/Interfaces.js";

describe("TurnManager class", () => {
  describe("When item is created", () => {
    const cardCode = ItemCode.CORN;
    const turn = 1;
    const item = TurnManager.createItem(cardCode, turn);
    test("then it should have proper id and turn", () => {
      expect(item.id).toBeDefined();
      expect(item.turn).toBe(turn);
    });
  });
  describe("When card is played", () => {
    const card: CardInterface = {
      id: "card1",
      code: CardCode.CORN,
    };
    const slot: SlotInterface = {
      id: "slot1",
      type: SlotType.MILPA,
      isEmpty: true,
      items: [],
      addItems(items: ItemInterface[]) {
        this.items = items;
      },
      deleteItem(id: string) {},
    };
    const turn = 1;
    TurnManager.playCard(card, slot, turn);
    test("then it should have item in slot", () => {
      expect(slot.items.length).toBe(1);
      expect(slot.items[0].turn).toBe(turn);
      expect(slot.items[0].itemCode).toBe(ItemCode.CORN);
    });
  });
});
