import { Modal } from "../";

const Event = ({
  event,
  setViewingEvent,
  setShowingEventForm,
  deleteEvent,
}) => {
  return (
    <Modal
      onClose={() => setViewingEvent(null)}
      title={`${event.name} (${event.type})`}
      className="eventModal"
    >
      <p>
        From <b>{event.dateFrom}</b> to <b>{event.dateTo}</b>
      </p>
      <p>{event.meta}</p>

      <button
        onClick={() => {
          setViewingEvent(null);
          setShowingEventForm({ visible: true, withEvent: event });
        }}
      >
        Change this event
      </button>

      <button className="red" onClick={() => deleteEvent(event)}>
        Delete this event
      </button>

      <button className="close" onClick={() => setViewingEvent(null)}>
        Back to calendar
      </button>
    </Modal>
  );
};

export default Event;
