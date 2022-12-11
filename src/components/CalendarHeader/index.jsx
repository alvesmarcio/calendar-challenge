const CalendarHeader = ({ date, setDate, setShowingEventForm }) => {
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="calendarHeader">
      <div
        className="back"
        onClick={() => {
          const newDate = new Date(date);
          newDate.setMonth(newDate.getMonth() - 1);
          setDate(newDate);
        }}
      >
        {"<-"} {MONTHS[date.getMonth() === 0 ? 11 : date.getMonth() - 1]}
      </div>

      <div className="monthAndYear">
        {MONTHS[date.getMonth()]} {date.getFullYear()}
      </div>

      <div
        className="forward"
        onClick={() => {
          const newDate = new Date(date);
          newDate.setMonth(newDate.getMonth() + 1);
          setDate(newDate);
        }}
      >
        {MONTHS[date.getMonth() === 11 ? 0 : date.getMonth() + 1]} {"->"}
      </div>
    </div>
  );
};

export default CalendarHeader;
