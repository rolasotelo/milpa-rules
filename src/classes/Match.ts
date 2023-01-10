import { MessengerInterface, PlayerInterface } from "../common/interfaces.js";
import BoardManager from "./BoardManager.js";
import TurnManager from "./TurnManager.js";
import DeckManager from "./DeckManager.js";

/**
 * @class Match
 * @classdesc Manages the match. It has the players, the board and the turn manager.
 * @property id - The id of the match.
 * @property players - An array of players.
 * @property boardManager - The board manager. It has the milpas and edges of each player.
 * @property turnManager - The turn manager. It knows how to play cards and advance the match.
 * @since 1.0.0
 *
 */

const LocalMessenger: MessengerInterface = {
  isReadyToStart: true,
  openLobby(
    lobbyId: string,
    lobbySize: number,
    leader: PlayerInterface
  ): void {},
  joinLobby(lobbyId: string, player: PlayerInterface): void {},
  shareMatchState(lobbyId: string, sender: string, state: string): void {},
};

class Match {
  private static instance: Match;

  private boardManager: BoardManager;

  private turnManager: TurnManager;

  private deckManager: DeckManager;

  private messenger: MessengerInterface;

  private playersById: { [id: string]: PlayerInterface };

  private constructor(
    public readonly id: string,
    public readonly localTo: string,
    public readonly date: Date,
    public readonly players: PlayerInterface[],
    messenger?: MessengerInterface
  ) {
    this.boardManager = BoardManager.getInstance(players.map((p) => p.id));
    // Get random first player
    const firstPlayer = players[Math.floor(Math.random() * players.length)].id;
    this.turnManager = TurnManager.getInstance(firstPlayer);
    // Player count
    const playerCount = players.length;
    this.deckManager = DeckManager.getInstance(playerCount);
    // Convert players array to object
    this.playersById = players.reduce((acc, p) => {
      acc[p.id] = p;
      return acc;
    }, {} as { [id: string]: PlayerInterface });
    if (messenger) {
      this.messenger = messenger;
    } else {
      this.messenger = LocalMessenger;
    }
  }

  public static getInstance(input?: {
    id: string;
    localTo: string;
    date: Date;
    players: PlayerInterface[];
    messenger?: MessengerInterface;
  }): Match {
    if (!Match.instance && !input) {
      throw new Error("Input is required to create a new instance");
    }
    if (!Match.instance && input) {
      const { id, localTo, date, players, messenger } = input;
      Match.instance = new Match(id, localTo, date, players, messenger);
    }
    return Match.instance;
  }

  public static getLocalInstance(input: {
    id: string;
    localTo: string;
    date: Date;
    players: PlayerInterface[];
    messenger?: MessengerInterface;
  }): Match {
    const { id, localTo, date, players, messenger } = input;
    return new Match(id, localTo, date, players, messenger);
  }

  public get turn(): number {
    return this.turnManager.turn;
  }

  public start(): void {
    if (this.messenger.isReadyToStart) {
      this.deckManager.initDecks();
      this.turnManager.start();
    } else {
      throw new Error("The game is not ready to start");
    }
  }
}

export default Match;
