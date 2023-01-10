import { CardCode } from "../../src/common/enums.js";
import CardManager from "../../src/classes/CardManager.js";

describe("CardManager class", () => {
  describe("When card is created", () => {
    const code = CardCode.CORN;
    const card = CardManager.createCard(code);
    test("then it should have proper id and code", () => {
      expect(card.id).toBeDefined();
      expect(card.code).toBe(code);
    });
  });
  describe("When getting card slot interactor", () => {
    const code = CardCode.CORN;
    const interactor = CardManager.getCardSlotInteractor(code);
    test("then it should return a function", () => {
      expect(interactor).toBeInstanceOf(Function);
    });
  });
  describe("When getting can card be played", () => {
    const code = CardCode.CORN;
    const canCardBePlayed = CardManager.getCanCardBePlayed(code);
    test("then it should return a function", () => {
      expect(canCardBePlayed).toBeInstanceOf(Function);
    });
  });
});
