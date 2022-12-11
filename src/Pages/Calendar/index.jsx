import { useState, useEffect } from "react";

import {
  Loader,
  Toast,
  DayLabels,
  Event,
  EventForm,
  CalendarGrid,
  CalendarHeader,
} from "../../components";

import { parseEvents } from "../../utils/event";

const Calendar = ({ month, year, preloadedEvents = [] }) => {
  const selectedDate = new Date(year, month);

  const [date, setDate] = useState(selectedDate);
  const [viewingEvent, setViewingEvent] = useState(false);
  const [showingEventForm, setShowingEventForm] = useState({ visible: false });
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState("");

  const parsedEvents = parseEvents(preloadedEvents);
  const [events, setEvents] = useState(parsedEvents);

  const showToast = ({ message, type, timeout = 2500 }) => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, timeout);
  };

  const addEvent = (event) => {
    setIsLoading(true);
    setShowingEventForm({ visible: false });

    setTimeout(() => {
      const parsedEvents = parseEvents([event]);

      const updatedEvents = [...events];
      updatedEvents.push(parsedEvents[0]);

      setEvents(updatedEvents);
      setIsLoading(false);
      showToast({ message: "Event created successfully", type: "success" });
    }, 2200);
  };

  const editEvent = (event) => {
    setIsLoading(true);
    setShowingEventForm({ visible: false });

    setTimeout(() => {
      const parsedEvent = parseEvents([event]);

      const updatedEvents = [...events].map((updatedEvent) => {
        return updatedEvent.id === event.id ? parsedEvent[0] : updatedEvent;
      });

      setEvents(updatedEvents);
      setIsLoading(false);
      showToast({ message: "Event edited successfully", type: "success" });
    }, 2200);
  };

  const deleteEvent = (event) => {
    setIsLoading(true);
    setViewingEvent(null);

    setTimeout(() => {
      const updatedEvents = [...events].filter(
        (finalEvent) => finalEvent.id !== event.id
      );

      setEvents(updatedEvents);
      setIsLoading(false);
      showToast({ message: "Event deleted successfully", type: "success" });
    }, 2200);
  };

  useEffect(() => {
    // This useEffect will keep track of changes in dates to display new events.
    // When we get changes, retrieve from backend the events.
  }, []);

  return (
    <div className="calendar">
      {isLoading && <Loader />}

      {toast && <Toast message={toast.message} type={toast.type} />}

      <CalendarHeader
        date={date}
        setDate={setDate}
        setShowingEventForm={setShowingEventForm}
      />

      <DayLabels />

      <CalendarGrid
        date={date}
        events={events}
        setShowingEventForm={setShowingEventForm}
        setViewingEvent={setViewingEvent}
        actualDate={date}
      />

      {viewingEvent && (
        <Event
          event={viewingEvent}
          setShowingEventForm={setShowingEventForm}
          setViewingEvent={setViewingEvent}
          deleteEvent={deleteEvent}
        />
      )}

      {showingEventForm && showingEventForm.visible && (
        <EventForm
          withEvent={showingEventForm.withEvent}
          preselectedDate={showingEventForm.preselectedDate}
          setShowingEventForm={setShowingEventForm}
          addEvent={addEvent}
          editEvent={editEvent}
          setViewingEvent={setViewingEvent}
        />
      )}
    </div>
  );
};

export default Calendar;
