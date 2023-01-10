import * as assert from "assert";
import {
  MessengerInterface,
  PlayerInterface,
} from "../../src/common/interfaces.js";
import Match from "../../src/classes/Match.js";

/**
 * These objects are used to mock the messenger and memory. The messenger
 * will be implemented in the frontend app with the help of websockets. And
 * the memory is an object serving as shared memory between the players and
 * the server, for simplicity .
 */
const memory: {
  lobby: {
    [key: string]: {
      players: PlayerInterface[];
      size: number;
      state: string;
    };
  };
  players: {
    [key: string]: { notifications: string[]; players: PlayerInterface[] };
  };
} = {
  lobby: {},
  players: {},
};
const messenger: MessengerInterface = {
  get isReadyToStart(): boolean {
    // Delete readiness messages from notifications for all players
    Object.keys(memory.players).forEach((playerId) => {
      memory.players[playerId].notifications = memory.players[
        playerId
      ].notifications.filter(
        (notification) => notification !== "Game is ready"
      );
    });
    return true;
  },
  openLobby(lobbyId: string, lobbySize: number, leader: PlayerInterface): void {
    memory.lobby[lobbyId] = {
      players: [leader],
      size: lobbySize,
      state: "",
    };
    memory.players[leader.id] = {
      notifications: [],
      players: [],
    };
  },
  joinLobby(lobbyId: string, player: PlayerInterface): void {
    memory.lobby[lobbyId].players.push(player);
    memory.players[player.id] = {
      notifications: [],
      players: [],
    };
    if (memory.lobby[lobbyId].players.length === memory.lobby[lobbyId].size) {
      // Send notification to all players
      Object.values(memory.lobby[lobbyId].players).forEach((p) => {
        memory.players[p.id].notifications.push("Game is ready");
      });
      // Create a list of players in each player's memory
      Object.values(memory.lobby[lobbyId].players).forEach((p) => {
        memory.players[p.id].players = memory.lobby[lobbyId].players;
      });
    }
  },
  shareMatchState(lobbyId: string, sender: string, state: string): void {
    // Save state in memory
    memory.lobby[lobbyId].state = `${sender}-${state}`;
    // Send notification to all players
    Object.values(memory.players).forEach((p) => {
      p.notifications.push(`${sender}-${state}`);
    });
  },
};

/**
 * Here starts the test. We create a match with 2 players
 */

// First player opens a lobby
const player1: PlayerInterface = {
  id: "player1",
  name: "Rolando",
};
const matchId = "match1";
messenger.openLobby(matchId, 2, player1);

// Then it shares the lobby id with the second player via a chat or something
const matchIdShared = "match1";
// Second player joins the lobby
const player2: PlayerInterface = {
  id: "player2",
  name: "Gabriela",
};
messenger.joinLobby(matchIdShared, player2);

// check that both players have proper notifications
assert.deepStrictEqual(memory.players[player1.id].notifications, [
  "Game is ready",
]);
assert.deepStrictEqual(memory.players[player2.id].notifications, [
  "Game is ready",
]);
// check that both players have proper players list
assert.deepStrictEqual(memory.players[player1.id].players, [player1, player2]);
assert.deepStrictEqual(memory.players[player2.id].players, [player1, player2]);

let matchFromPlayer1: Match;
// Both players are ready to start the game, but it's the leader who creates
// the seed match, which is the first one to sync from.
// The leader creates the main match
if (messenger.isReadyToStart) {
  // Start the game
  matchFromPlayer1 = Match.getLocalInstance({
    id: matchId,
    localTo: player1.id,
    date: new Date(),
    players: memory.players[player1.id].players,
    messenger,
  });
  // Notify the other player players
  messenger.shareMatchState(
    matchId,
    player1.id,
    "Match created and ready to start"
  );
} else {
  throw new Error("something went wrong");
}
// The other player creates a match and waits for a notification to sync it
