import { MiniEvent } from "..";

import { toStartOfDay } from "../../utils/date";
import { findEventsForDate } from "../../utils/event";

const CalendarGrid = ({
  date,
  events,
  setViewingEvent,
  setShowingEventForm,
  actualDate,
}) => {
  const ROWS_COUNT = 6;
  const currentDate = toStartOfDay(new Date());

  const startingDate = new Date(date.getFullYear(), date.getMonth(), 1);
  startingDate.setDate(startingDate.getDate() - (startingDate.getDay() - 1));

  const dates = [];
  for (let i = 0; i < ROWS_COUNT * 7; i++) {
    const date = new Date(startingDate);
    dates.push({ date, events: findEventsForDate(events, date) });
    startingDate.setDate(startingDate.getDate() + 1);
  }

  const getWeekend = (index) => {
    // Don't like this function... but for some reason || is not working.
    if (index === 5) return "weekend";
    if (index === 6) return "weekend";
    if (index === 12) return "weekend";
    if (index === 13) return "weekend";
    if (index === 19) return "weekend";
    if (index === 20) return "weekend";
    if (index === 26) return "weekend";
    if (index === 27) return "weekend";
    if (index === 33) return "weekend";
    if (index === 34) return "weekend";
    if (index === 39) return "weekend";
    if (index === 40) return "weekend";
  };

  return (
    <>
      {dates.map((date, index) => {
        return (
          <div
            key={index}
            className={`cell ${
              date.date.getTime() === currentDate.getTime() ? "current" : ""
            } ${
              date.date.getMonth() !== actualDate.getMonth() ? "otherMonth" : ""
            } ${getWeekend(index)}`}
          >
            <div className="date">
              {date.date.getDate()}
              <button
                className="addEventOnDay"
                onClick={() =>
                  setShowingEventForm({
                    visible: true,
                    preselectedDate: date.date,
                  })
                }
              >
                +
              </button>
            </div>
            {date.events.map((event, index) => (
              <MiniEvent
                key={index}
                event={event}
                setViewingEvent={setViewingEvent}
              />
            ))}
          </div>
        );
      })}
    </>
  );
};

export default CalendarGrid;
