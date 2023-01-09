import { BoardManagerInterface, SlotInterface } from "../common/Interfaces.js";
import Slot from "./Slot.js";
import { SlotType } from "../common/enums.js";

/**
 * @class BoardManager
 * @classdesc Manages the boards of the game. It has the milpas and edges of each player.
 * @property milpas - An object with the milpas of each player. The key is the player id and the value is an array of slots of type MILPA.
 * @property edges - An object with the edges of each player. The key is the player id and the value is an array of slots of type EDGE.
 * @since 1.0.0
 */

class BoardManager implements BoardManagerInterface {
  private static instance: BoardManager;

  public milpas: {
    [key: string]: SlotInterface[];
  };

  public edges: {
    [key: string]: SlotInterface[];
  };

  private constructor(ids?: string[]) {
    this.milpas = {};
    this.edges = {};
    // create milpa and edge for each player
    ids?.forEach((id) => {
      this.milpas[id] = BoardManager.createMilpa();
      this.edges[id] = BoardManager.createEdge();
    });
  }

  public static getInstance(ids?: string[]): BoardManager {
    if (!BoardManager.instance) {
      if (!ids) {
        throw new Error("You must provide player ids");
      }
      BoardManager.instance = new BoardManager(ids);
    }
    return BoardManager.instance;
  }

  private static createMilpa(): SlotInterface[] {
    return Array.from(
      Array(16),
      (_, index) => new Slot(index + 1, SlotType.MILPA)
    );
  }

  private static createEdge(): SlotInterface[] {
    return Array.from(
      Array(16),
      (_, index) => new Slot(index + 1, SlotType.EDGE)
    );
  }
}

export default BoardManager;
