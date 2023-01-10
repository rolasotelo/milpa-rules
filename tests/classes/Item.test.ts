import Item from "../../src/classes/Item.js";
import { ItemCode } from "../../src/common/enums.js";

describe("Item class", () => {
  describe("When item is created without id", () => {
    const cardCode = ItemCode.CORN;
    const turn = 1;
    const item = new Item(cardCode, turn);
    test("then it should have proper cardCode and turn", () => {
      expect(item.itemCode).toBe(cardCode);
      expect(item.turn).toBe(turn);
      expect(typeof item.id).toBe("string");
      expect(item.id.length).toBeGreaterThan(0);
    });
  });
  describe("When item is created with id", () => {
    const id = "1";
    const cardCode = ItemCode.CORN;
    const turn = 1;
    const item = new Item(cardCode, turn, id);
    test("then it should have proper cardCode and turn", () => {
      expect(item.id).toBe(id);
      expect(item.itemCode).toBe(cardCode);
      expect(item.turn).toBe(turn);
    });
  });
});
