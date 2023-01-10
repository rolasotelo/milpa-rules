import { PlayerInterface } from "../common/Interfaces.js";
import BoardManager from "./BoardManager.js";
import TurnManager from "./TurnManager.js";

/**
 * @class Match
 * @classdesc Manages the match. It has the players, the board and the turn manager.
 * @property id - The id of the match.
 * @property players - An array of players.
 * @property boardManager - The board manager. It has the milpas and edges of each player.
 * @property turnManager - The turn manager. It knows how to play cards and advance the match.
 *
 */

class Match {
  private static instance: Match;

  private boardManager: BoardManager;

  private turnManager: TurnManager;

  private constructor(
    public readonly id: string,
    public readonly date: Date,
    public readonly players: PlayerInterface[]
  ) {
    this.boardManager = BoardManager.getInstance(players.map((p) => p.id));
    this.turnManager = TurnManager.getInstance();
  }

  public static getInstance(
    id: string,
    date: Date,
    players: PlayerInterface[]
  ): Match {
    if (!Match.instance) {
      Match.instance = new Match(id, date, players);
    }
    return Match.instance;
  }

  public get turn(): number {
    return this.turnManager.turn;
  }
}

export default Match;
