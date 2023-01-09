import Slot from "../../src/classes/Slot.js";
import { ItemId, SlotType } from "../../src/common/enums.js";

describe("Slot class", () => {
  describe("When slot is created", () => {
    const boardPosition = 1;
    const type = SlotType.MILPA;
    const slot = new Slot(boardPosition, type);
    test("then it should be empty", () => {
      expect(slot.isEmpty).toBeTruthy();
    });
    test("then it should have proper boardPosition and type", () => {
      expect(slot.boardPosition).toBe(boardPosition);
      expect(slot.type).toBe(type);
    });
    test("then it should have proper id", () => {
      expect(typeof slot.id).toBe("string");
      expect(slot.id.length).toBeGreaterThan(0);
    });
  });
  describe("When slots are created with MILPA type", () => {
    test("then they should have proper column and row", () => {
      const boardPosition = 1;
      const type = SlotType.MILPA;
      const slot = new Slot(boardPosition, type);
      expect(slot.row).toBe(1);
      expect(slot.column).toBe(1);

      const boardPosition2 = 4;
      const slot2 = new Slot(boardPosition2, type);
      expect(slot2.row).toBe(1);
      expect(slot2.column).toBe(4);

      const boardPosition3 = 5;
      const slot3 = new Slot(boardPosition3, type);
      expect(slot3.row).toBe(2);
      expect(slot3.column).toBe(1);

      const boardPosition4 = 16;
      const slot4 = new Slot(boardPosition4, type);
      expect(slot4.row).toBe(4);
      expect(slot4.column).toBe(4);
    });
    test("then they should throw error when boardPosition is out of range", () => {
      const boardPosition = 0;
      const type = SlotType.MILPA;
      const slot = new Slot(boardPosition, type);
      expect(() => slot.row).toThrow("Board position is out of range");
      const boardPosition2 = 17;
      const slot2 = new Slot(boardPosition2, type);
      expect(() => slot2.column).toThrow("Board position is out of range");
    });
  });
  describe("When slots are created with EDGE type", () => {
    const boardPosition = 1;
    const type = SlotType.EDGE;
    const slot = new Slot(boardPosition, type);
    expect(slot.edge).toEqual([1, "top"]);
    expect(slot.position).toBe(1);

    const boardPosition2 = 4;
    const slot2 = new Slot(boardPosition2, type);
    expect(slot2.edge).toEqual([1, "top"]);
    expect(slot2.position).toBe(4);

    const boardPosition3 = 5;
    const slot3 = new Slot(boardPosition3, type);
    expect(slot3.edge).toEqual([2, "right"]);
    expect(slot3.position).toBe(1);

    const boardPosition4 = 16;
    const slot4 = new Slot(boardPosition4, type);
    expect(slot4.edge).toEqual([4, "left"]);
    expect(slot4.position).toBe(4);
  });
  describe("When items are added to slot", () => {
    const boardPosition = 1;
    const type = SlotType.MILPA;
    const slot = new Slot(boardPosition, type);
    test("then slot should not be empty", () => {
      expect(slot.isEmpty).toBeTruthy();
      slot.addItems([{ id: "testid", turn: 1, cardCode: ItemId.CORN }]);
      expect(slot.isEmpty).toBeFalsy();
    });
    test("then slot should have items", () => {
      expect(slot.items.length).toBe(1);
    });
    test("then they can be removed", () => {
      slot.deleteItem("testid");
      expect(slot.isEmpty).toBeTruthy();
    });
  });
});
