import { useState } from "react";

import { dateToInputFormat } from "../../utils/date";

import { Modal } from "../";

const EventForm = ({
  setShowingEventForm,
  addEvent,
  editEvent,
  withEvent,
  setViewingEvent,
  preselectedDate,
}) => {
  const newEvent = withEvent || {};
  if (!withEvent && !!preselectedDate) {
    newEvent.dateFrom = dateToInputFormat(preselectedDate);
  }
  const [event, setEvent] = useState(newEvent);

  return (
    <Modal
      onClose={() => setShowingEventForm({ visible: false })}
      title={`${withEvent ? "Edit event" : "Add a new event"}`}
    >
      <div className="form">
        <label>
          Name
          <input
            type="text"
            placeholder="Event title"
            defaultValue={event.name}
            onChange={(e) => setEvent({ ...event, name: e.target.value })}
          />
        </label>

        <label>
          Date from
          <input
            type="datetime-local"
            defaultValue={event.dateFrom || dateToInputFormat(preselectedDate)}
            onChange={(e) => setEvent({ ...event, dateFrom: e.target.value })}
          />
        </label>

        <label>
          Date to
          <input
            type="datetime-local"
            defaultValue={event.dateTo}
            onChange={(e) => setEvent({ ...event, dateTo: e.target.value })}
          />
        </label>

        <label>
          Type
          <select
            value={event.type ? event.type.toLowerCase() : "standard"}
            onChange={(e) => setEvent({ ...event, type: e.target.value })}
          >
            <option value="standard">Standard</option>
            <option value="busy">Busy</option>
            <option value="holiday">Holiday</option>
          </select>
        </label>

        <label>
          Description
          <input
            type="text"
            placeholder="Describe the event"
            defaultValue={event.meta}
            onChange={(e) => setEvent({ ...event, meta: e.target.value })}
          />
        </label>

        {withEvent ? (
          <>
            <button onClick={() => editEvent(event)}>Edit event</button>
            <button
              className="close"
              onClick={() => {
                setShowingEventForm({ visible: false });
                setViewingEvent(event);
              }}
            >
              Cancel (go back to event view)
            </button>
          </>
        ) : (
          <>
            <button onClick={() => addEvent(event)}>
              Add event to calendar
            </button>
            <button
              className="red"
              onClick={() => setShowingEventForm({ visible: false })}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default EventForm;
