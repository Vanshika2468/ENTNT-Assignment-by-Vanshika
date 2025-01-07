import React, { useState } from "react";
import "./User.css";
import Calendar from "./Calendar";

function User() {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [showPopups, setShowPopups] = useState(false);
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [communicationType, setCommunicationType] = useState("");
    const [communicationDate, setCommunicationDate] = useState("");
    const [communicationNotes, setCommunicationNotes] = useState("");
  

const [dashboardData, setDashboardData] = useState([
    {
    companyName: "Company A",
    lastCommunications: [
        { type: "Email", date: "2025-01-02" },
        { type: "Call", date: "2024-12-25" },
        { type: "LinkedIn Post", date: "2024-12-15", notes: "Promotional post." },
    ],
    nextCommunication: { type: "Meeting", date: "2025-01-03" },
    },
    {
    companyName: "Company B",
    lastCommunications: [
        { type: "Email", date: "2025-01-01" },
        { type: "Call", date: "2024-12-26", notes: "Discussing next software design" },
        { type: "LinkedIn Post", date: "2024-12-20" },
    ],
    nextCommunication: { type: "Email", date: "2025-01-01" },
    },
    {
    companyName: "Company C",
    lastCommunications: [
        { type: "LinkedIn Post", date: "2025-01-10" },
        { type: "Email", date: "2025-01-05" },
        { type: "Call", date: "2025-01-01" },
    ],
    nextCommunication: { type: "Call", date: "2025-01-15" },
    },
    {
    companyName: "Company D",
    lastCommunications: [
        { type: "Meeting", date: "2025-01-08" },
        { type: "LinkedIn Post", date: "2025-01-02" },
        { type: "Email", date: "2024-12-30" },
    ],
    nextCommunication: { type: "Meeting", date: "2025-01-20" },
    },
    {
    companyName: "Company E",
    lastCommunications: [
        { type: "Call", date: "2025-01-12" },
        { type: "Email", date: "2025-01-10" },
        { type: "LinkedIn Post", date: "2025-01-01" },
    ],
    nextCommunication: { type: "LinkedIn Post", date: "2025-01-25" },
    },
]);
const handleCompanySelection = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedCompanies([...selectedCompanies, value]);
    } else {
      setSelectedCompanies(
        selectedCompanies.filter((company) => company !== value)
      );
    }
  };
  const handleLogCommunication = () => {
    if (!selectedCompanies.length) {
      alert("Please select at least one company to log communication.");
      return;
    }
    if (!communicationType || !communicationDate) {
      alert("Please fill in the type and date of communication.");
      return;
    }
    const updatedData = dashboardData.map((company) => {
      if (selectedCompanies.includes(company.companyName)) {
        const updatedLastCommunications = [
          {
            ...company.nextCommunication, // Move current `Next Scheduled Communication` to `Last Five Communications`
            notes: communicationNotes, // Add notes
          },
          ...company.lastCommunications,
        ].slice(0, 5);  // Keep only the last 5 communications

        return {
          ...company,
          lastCommunications: updatedLastCommunications,
          nextCommunication: {
            type: communicationType,
            date: communicationDate,
          },
        };
      }
      return company;
    });

    setDashboardData(updatedData);

    // Reset fields after submission
    setSelectedCompanies([]);
    setCommunicationType("");
    setCommunicationDate("");
    setCommunicationNotes("");
    setShowPopups(false);
  };
const isToday = (dateString) => {
    const today = new Date().toISOString().split("T")[0];
    return dateString === today;
};

const isBeforeToday = (dateString) => {
    const today = new Date();
    const communicationDate = new Date(dateString);
    return communicationDate < today.setHours(0, 0, 0, 0);
};
const overdueCommunications = dashboardData.filter((company) =>
!isToday(company.nextCommunication.date) &&
isBeforeToday(company.nextCommunication.date)
);

const todaysCommunications = dashboardData.filter((company) =>
    isToday(company.nextCommunication.date)
);
const notificationCount = overdueCommunications.length + todaysCommunications.length;


const renderDashboard = () => (
    <div className="dashboard">
        <button className="log-communication-button" onClick={() => {
      if (!selectedCompanies.length) {
        alert("Please select a company to log communication.");
        return;
      }
      setShowPopups(true);
    }}
  >
    + Communication Performed
  </button>
    <table className="dashboard-table">
        <thead>
        <tr>
        <th>Select</th>
        <th>Company Name</th>
        <th>Last Five Communications</th>
        <th>Next Scheduled Communication</th>
      </tr>
        </thead>
        <tbody>
        {dashboardData.map((company, index) => {
            const highlightClass =
            isToday(company.nextCommunication.date)
                ? "highlight-yellow"
                : isBeforeToday(company.nextCommunication.date)
                ? "highlight-red"
                : "";

            return (
            <tr key={index} className={highlightClass}>
                <td>
            <input
              type="checkbox"
              value={company.companyName}
              checked={selectedCompanies.includes(company.companyName)}
              onChange={handleCompanySelection}
            />
          </td>
                <td>{company.companyName}</td>
                <td>
                {company.lastCommunications.map((comm, idx) => (
                    <div
                    key={idx}
                    className="communication"
                    title={comm.notes ? comm.notes : "No notes available"} // Tooltip with notes
                  >
                    {comm.type} - {comm.date}
                  </div>
                ))}
                </td>
                <td>
                {company.nextCommunication.type} - {company.nextCommunication.date}
                </td>
            </tr>
            );
        })}
        </tbody>
    </table>
    {showPopups && (
    <div className="popups-overlay">
      <div className="popups">
        <h3>Log Communication</h3>
        <label>
          Type of Communication:
          <select
            value={communicationType}
            onChange={(e) => setCommunicationType(e.target.value)}
          >
            <option value="">Select</option>
            <option value="LinkedIn Post">LinkedIn Post</option>
            <option value="Email">Email</option>
            <option value="Call">Call</option>
            <option value="Meeting">Meeting</option>
          </select>
        </label>
        <label>
          Date of Communication:
          <input
            type="date"
            value={communicationDate}
            onChange={(e) => setCommunicationDate(e.target.value)}
          />
        </label>
        <label>
          Notes:
          <textarea
            value={communicationNotes}
            onChange={(e) => setCommunicationNotes(e.target.value)}
          />
        </label>
        <div className="popups-buttons">
          <button onClick={handleLogCommunication}>Submit</button>
          <button onClick={() => setShowPopups(false)}>Cancel</button>
        </div>
      </div>
    </div>
  )}
    </div>
);
const renderNotifications = () => (
    <div className="notifications">
        <div className="notification-summary">
            <button className="summary-button overdue-button">
             <h3>Overdue Communications</h3>
             <p>{overdueCommunications.length}</p>
            </button>
            <button className="summary-button due-today-button">
             <h3>Due Today</h3>
             <p>{todaysCommunications.length}</p>
            </button>
        </div>
    <h2 className="overdue-heading">Overdue Communications</h2>
    <table className="dashboard-tablee">
  <thead>
    <tr>
      
     
    </tr>
  </thead>
  <tbody>
    {overdueCommunications.map((company, index) => (
      <tr key={index} className="highlight-red">
        <td>{company.companyName}</td>
        <td>{`${company.nextCommunication.type} - ${company.nextCommunication.date}`}</td>

      </tr>
    ))}
  </tbody>
</table>


    <h2 className="todays-heading">Today's Communications</h2>
    <table className="dashboard-tablee">
    <thead>
        <tr>
        
        </tr>
    </thead>
    <tbody>
        {todaysCommunications.map((company, index) => (
        <tr key={index} className="highlight-yellow">
            <td>{company.companyName}</td>
            <td>
            {`${company.nextCommunication.type} - ${company.nextCommunication.date}`}

            </td>
        </tr>
        ))}
    </tbody>
    </table>
    </div>
);


return (
    <div className="user-container">
    <div className="tab-buttons">
        <button
        onClick={() => setActiveTab("dashboard")}
        className={activeTab === "dashboard" ? "active" : ""}
        >
        Dashboard
        </button>
        <button
        onClick={() => setActiveTab("notifications")}
        className={activeTab === "notifications" ? "active" : ""}
        >
        Notifications
        {notificationCount > 0 && (
            <span className="notification-badge">{notificationCount}</span>
        )}
        </button>
        <button
        onClick={() => setActiveTab("calendar")}
        className={activeTab === "calendar" ? "active" : ""}
        >
        Calendar
        </button>
    </div>
    <div className="contenttt">
        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "notifications" && renderNotifications()}
        {activeTab === "calendar" && <Calendar dashboardData={dashboardData} />}
    </div>
    </div>
);
}

export default User;

