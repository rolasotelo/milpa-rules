import Stringifier from "../../src/classes/Stringifier.js";
import { ItemPlayedInTurn } from "../../src/common/Interfaces.js";
import { ItemId } from "../../src/common/enums.js";

describe("Stringifier class", () => {
  describe("When stringifier is created", () => {
    const stringifier = Stringifier.getInstance();
    const stringifier2 = Stringifier.getInstance();
    test("then it should be a singleton", () => {
      expect(stringifier).toBe(stringifier2);
    });
  });
  describe("When item is created", () => {
    const id = "1";
    const turn = 1;
    const cardCode = ItemId.CORN;
    const item: ItemPlayedInTurn = {
      cardCode,
      turn,
      id,
    };
    test("then it should be properly stringify", () => {
      expect(Stringifier.stringifyItem(item)).toBe(`${id}@${cardCode}@${turn}`);
    });
  });
  describe("When item is created from string", () => {
    const id = "1";
    const turn = 1;
    const cardCode = ItemId.CORN;
    const itemString = `${id}@${cardCode}@${turn}`;
    function instantiate(
      idOfItem: string,
      cardCodeOfItem: ItemId,
      turnOfItem: number
    ) {
      return {
        cardCode: cardCodeOfItem,
        turn: turnOfItem,
        id: idOfItem,
      } as ItemPlayedInTurn;
    }
    test("then it should be properly instantiated", () => {
      const item = Stringifier.createItemFromString(itemString, instantiate);
      expect(item.id).toBe(id);
      expect(item.turn).toBe(turn);
      expect(item.cardCode).toBe(cardCode);
    });
  });
});
