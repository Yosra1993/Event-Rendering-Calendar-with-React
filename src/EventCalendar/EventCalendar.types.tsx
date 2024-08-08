import { Key } from "react";

export interface EventTypes {
  id: Key;
  start: string;
  duration: number;
}

export interface EventCalendarProps {
  eventsData: EventTypes[];
}
