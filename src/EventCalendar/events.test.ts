import { EventTypes } from ".";
import { timeToMinutes, isOverlapping, prepareEvents } from "./_utils";

describe("Event Functions", (): void => {
  describe("timeToMinutes", (): void => {
    it('should convert "09:30" to 570 minutes', (): void => {
      expect(timeToMinutes("09:30")).toBe(570);
    });

    it('should convert "15:45" to 945 minutes', (): void => {
      expect(timeToMinutes("15:45")).toBe(945);
    });

    it('should convert "00:00" to 0 minutes', (): void => {
      expect(timeToMinutes("00:00")).toBe(0);
    });
  });

  describe("isOverlapping", (): void => {
    it("should detect overlapping events", (): void => {
      const event1 = { id: 1, start: "09:00", duration: 60 };
      const event2 = { id: 2, start: "09:30", duration: 60 };
      expect(isOverlapping(event1, event2)).toBe(true);
    });

    it("should detect non-overlapping events", (): void => {
      const event1 = { id: 1, start: "09:00", duration: 30 };
      const event2 = { id: 2, start: "09:30", duration: 30 };
      expect(isOverlapping(event1, event2)).toBe(false);
    });

    it("should detect events that end exactly when another starts as non-overlapping", () => {
      const event1 = { id: 1, start: "09:00", duration: 30 };
      const event2 = { id: 2, start: "09:30", duration: 30 };
      expect(isOverlapping(event1, event2)).toBe(false);
    });
  });

  describe("prepareEvents", (): void => {
    it("should sort events and place them without overlap", () => {
      const events: EventTypes[] = [
        { id: 1, start: "10:00", duration: 120 },
        { id: 2, start: "09:00", duration: 60 },
        { id: 3, start: "11:00", duration: 30 },
      ];

      const preparedEvents = prepareEvents(events);

      // Définir les valeurs attendues en arrondissant avec Math.round
      const expectedEvents = [
        {
          id: 2,
          start: "09:00",
          duration: 60,
          top: 0, // ((540 - 540) / 720) * 100 arrondi
          height: 8, // (60 / 720) * 100 arrondi
          left: 0, // Premier élément dans le premier "stack" arrondi
          width: 50, // 100 / 2 stacks arrondi
          zIndex: 0,
        },
        {
          id: 1,
          duration: 120,
          top: 8, // ((600 - 540) / 720) * 100 arrondi
          height: 17, // (120 / 720) * 100 arrondi
          left: 0, // Premier élément dans le premier "stack" arrondi
          start: "10:00",
          width: 50, // 100 / 2 stacks arrondi
          zIndex: 1,
        },
        {
          id: 3,
          start: "11:00",
          top: 17, // ((660 - 540) / 720) * 100 arrondi
          duration: 30,
          height: 4, // (30 / 720) * 100 arrondi
          left: 50, // Deuxième "stack" arrondi
          width: 50, // 100 / 2 stacks arrondi
          zIndex: 0,
        },
      ];

      // Comparer les valeurs arrondies
      expect(preparedEvents).toEqual(expectedEvents);
    });
  });
});
