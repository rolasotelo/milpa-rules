import { CardCode, ItemCode } from "./enums.js";

export interface ItemInterface {
  id: string;
  turn: number;
  itemCode: ItemCode;
}

export interface CardWithoutIdInterface {
  code: CardCode;
  name: string;
  description: string;
  summary: string;
}

export interface CardInterface {
  id: string;
  code: CardCode;
}

export interface SlotInterface {
  id: string;
  type: string;
  items: ItemInterface[];
  isEmpty: boolean;
  addItems(items: ItemInterface[]): void;
  deleteItem(id: string): void;
}
export interface BoardManagerInterface {
  milpas: {
    [key: string]: SlotInterface[];
  };
  edges: {
    [key: string]: SlotInterface[];
  };
}

export interface PlayerInterface {
  id: string;
  name: string;
}

export interface MessengerInterface {
  isReadyToStart: boolean;
  openLobby: (
    lobbyId: string,
    lobbySize: number,
    leader: PlayerInterface
  ) => void;
  joinLobby: (lobbyId: string, player: PlayerInterface) => void;
  shareMatchState(lobbyId: string, sender: string, state: string): void;
}
