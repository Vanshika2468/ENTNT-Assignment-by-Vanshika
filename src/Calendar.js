import React, { useState } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";

const localizer = momentLocalizer(moment);

function Calendar({ dashboardData }) {
  // Transform data for the calendar events
  const events = dashboardData.flatMap((company) => [
    ...company.lastCommunications.map((comm) => ({
      title: `Past: ${comm.type} (${company.companyName})`,
      start: new Date(comm.date),
      end: new Date(comm.date),
      allDay: true,
    })),
    {
      title: `Upcoming: ${company.nextCommunication.type} (${company.companyName})`,
      start: new Date(company.nextCommunication.date),
      end: new Date(company.nextCommunication.date),
      allDay: true,
    },
  ]);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Handlers for navigation
  const handlePrevMonth = () => {
    setCurrentDate(moment(currentDate).subtract(1, "month").toDate());
  };

  const handleNextMonth = () => {
    setCurrentDate(moment(currentDate).add(1, "month").toDate());
  };

  return (
    <div className="calendar-container">
      <div className="custom-toolbar">
        <button onClick={handlePrevMonth} className="arrow-button">
          &lt;
        </button>
        <span className="current-month">
          {moment(currentDate).format("MMMM YYYY")}
        </span>
        <button onClick={handleNextMonth} className="arrow-button">
          &gt;
        </button>
      </div>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={currentDate}
        onNavigate={(date) => setCurrentDate(date)}
        style={{ height: 500 }}
        views={["month"]} // Only display month view
        toolbar={false} // Disable default toolbar
        popup
        onSelectEvent={(event) => setSelectedEvent(event)}
        components={{
          event: ({ event }) => (
            <div className="custom-event">
              <span>{event.title}</span>
            </div>
          ),
        }}
      />
      {selectedEvent && (
        <div className="event-details">
          <div className="event-popup">
            <h3>Event Details</h3>
            <p>{selectedEvent.title}</p>
            <button onClick={() => setSelectedEvent(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
