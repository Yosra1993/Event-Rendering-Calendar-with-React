import React from "react";
import eventsData from "./input.json";
import "./App.css";
import { EventCalendar } from "./EventCalendar";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <EventCalendar eventsData={eventsData} />
    </div>
  );
};

export default App;
