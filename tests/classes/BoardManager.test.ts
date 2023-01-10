import BoardManager from "../../src/classes/BoardManager.js";
import { CardCode } from "../../src/common/enums.js";
import { CardInterface } from "../../src/common/interfaces.js";

describe("BoardManager class", () => {
  describe("When boardManager is created with ids", () => {
    const ids = ["player1", "player2"];
    const boardManager = BoardManager.getInstance(ids);
    test("then it should have proper board", () => {
      expect(boardManager.milpas.player1.length).toBe(16);
      expect(boardManager.milpas.player2.length).toBe(16);
      expect(boardManager.edges.player1.length).toBe(16);
      expect(boardManager.edges.player2.length).toBe(16);
      expect(boardManager.milpas.player1[0].isEmpty).toBeTruthy();
      expect(boardManager.milpas.player1[0].type).toBe("milpa");
      expect(boardManager.edges.player1[0].isEmpty).toBeTruthy();
      expect(boardManager.edges.player1[0].type).toBe("edge");
      expect(boardManager.milpas.player1[0].id).not.toBe(
        boardManager.milpas.player1[1].id
      );
      expect(boardManager.edges.player1[0].id).not.toBe(
        boardManager.edges.player1[1].id
      );
    });
  });
  describe("When checking if card can be played", () => {
    const ids = ["player1", "player2"];
    const boardManager = BoardManager.getInstance(ids);
    const card: CardInterface = {
      id: "card1",
      code: CardCode.CORN,
    };
    test("then it should return true for corn in milpa", () => {
      expect(boardManager.whereCanCardBePlayed(card, 1).milpas.player1[0]).toBe(
        true
      );
    });
    test("then it should return false for corn in edge", () => {
      expect(boardManager.whereCanCardBePlayed(card, 1).edges.player1[0]).toBe(
        false
      );
    });
  });
});
