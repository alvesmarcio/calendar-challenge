const MiniEvent = ({ event, setViewingEvent }) => {
  return (
    <div
      className={`miniEvent ${
        event.type ? event.type.toLowerCase() : "standard"
      }`}
      onClick={() => setViewingEvent(event)}
    >
      {event.name}
    </div>
  );
};

export default MiniEvent;
