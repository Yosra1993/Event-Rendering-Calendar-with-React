import { EventTypes } from ".";

/**
 * Convert a time string in "HH:MM" format to the total number of minutes since midnight.
 * @param time - Time string in "HH:MM" format.
 * @returns Total minutes since midnight.
 */
export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

/**
 * Check if two events overlap.
 * @param event1 - The first event.
 * @param event2 - The second event.
 * @returns True if the events overlap, false otherwise.
 */

export const isOverlapping = (
  event1: EventTypes,
  event2: EventTypes
): boolean => {
  const start1 = timeToMinutes(event1.start);
  const end1 = start1 + event1.duration;
  const start2 = timeToMinutes(event2.start);
  const end2 = start2 + event2.duration;
  return start1 < end2 && start2 < end1;
};

/**
 * Prepare event data for display, ensuring events that overlap are stacked horizontally.
 * @param events - Array of events to prepare.
 * @returns Array of events with calculated position and size properties.
 */

export const prepareEvents = (events: EventTypes[]) => {
  const startOfDay = timeToMinutes("09:00");
  const endOfDay = timeToMinutes("21:00");
  const totalMinutes = endOfDay - startOfDay;

  // Sort events by their start time.
  const sortedEvents = events.sort(
    (a, b) => timeToMinutes(a.start) - timeToMinutes(b.start)
  );

  // Stack events that overlap into separate columns.
  const eventStacks: EventTypes[][] = [];
  sortedEvents.forEach((event) => {
    let placed = false;
    let stack: EventTypes[];

    for (stack of eventStacks) {
      if (!isOverlapping(stack[stack.length - 1], event)) {
        stack.push(event);
        placed = true;
        break;
      }
    }
    if (!placed) {
      eventStacks.push([event]);
    }
  });

  // Calculate position and size for each event based on its stack and time.
  return eventStacks.flatMap((stack, stackIndex) =>
    stack.map((event, eventIndex) => ({
      ...event,
      top: Math.round(
        ((timeToMinutes(event.start) - startOfDay) / totalMinutes) * 100
      ),
      height: Math.round((event.duration / totalMinutes) * 100),
      left: Math.round((stackIndex / eventStacks.length) * 100),
      width: Math.round(100 / eventStacks.length),
      zIndex: eventIndex,
    }))
  );
};
