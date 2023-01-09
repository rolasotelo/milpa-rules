import Item from "../../src/classes/Item.js";
import { ItemId } from "../../src/common/enums.js";

describe("Item class", () => {
  describe("When item is created", () => {
    const id = ItemId.CORN;
    const turn = 1;
    const item = new Item(id, turn);
    test("then it should have proper id and turn", () => {
      expect(item.cardCode).toBe(id);
      expect(item.turn).toBe(turn);
    });
  });
});
