import "./EventCalendar.css";
import { useState, useEffect, useMemo, FC, CSSProperties } from "react";
import { EventCalendarProps, EventTypes, prepareEvents } from ".";

const EventCalendar: FC<EventCalendarProps> = ({ eventsData }) => {
  const [events, setEvents] = useState<EventTypes[]>(eventsData);

  const preparedEvents = useMemo(() => prepareEvents(events), [events]);

  useEffect(() => {
    const handleResize = () => {
      setEvents(eventsData);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [eventsData]);

  const Event: FC<{ event: EventTypes & CSSProperties }> = ({ event }) => {
    const { top, height, left, width, zIndex, id } = event;

    const style: CSSProperties = {
      position: "absolute",
      top: `${top}%`,
      height: `${height}%`,
      left: `${left}%`,
      width: `${width}%`,
      zIndex: zIndex,
      backgroundColor: "lightblue",
      border: "1px solid black",
      boxSizing: "border-box",
      padding: "5px",
    };

    return (
      <div className="calendar-event" style={style}>
        ID: {id.toString()}
      </div>
    );
  };

  return (
    <div className="calendar-container">
      {preparedEvents.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventCalendar;
