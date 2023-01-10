import Match from "../../src/classes/Match.js";

describe("Match class", () => {
  describe("When match is created", () => {
    const id = "Match1";
    const date = new Date();
    const players = [
      {
        id: "Player1",
        name: "Player 1",
      },
      {
        id: "Player2",
        name: "Player 2",
      },
    ];
    const match = Match.getInstance(id, date, players);
    test("then it should have proper id and players", () => {
      expect(match.id).toBe(id);
      expect(match.players).toBe(players);
    });
    test("then it should have proper date", () => {
      expect(match.date).toBe(date);
    });
    test("then it should have turn 0", () => {
      expect(match.turn).toBe(0);
    });
  });
});
