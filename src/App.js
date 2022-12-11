import "./App.css";
import Calendar from "./Pages/Calendar";

import createEventContext from "./context/eventContext";

import { dateToInputFormat } from "./utils/date";

const { EventProvider } = createEventContext();

const day = new Date();
const today = dateToInputFormat(day);
const month = day.getMonth();
const year = day.getFullYear();

console.log(day);

const preloadedEvents = [
  {
    id: 1,
    name: "Holiday",
    dateFrom: today,
    dateTo: today,
    meta: "Holiday",
    type: "Holiday",
  },
  {
    id: 2,
    name: "Meeting",
    dateFrom: today,
    dateTo: today,
    meta: "Meeting with boss!",
    type: "Standard",
  },
];

function App() {
  return (
    <div className="App">
      <EventProvider>
        <Calendar month={month} year={year} preloadedEvents={preloadedEvents} />
      </EventProvider>
    </div>
  );
}

export default App;
