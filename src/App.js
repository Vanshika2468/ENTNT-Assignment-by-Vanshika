import React, { useState } from "react";
import "./App.css";
import User from "./User"; 
import Report from "./Report"; 


function App() {
  const [alertMessages, setAlertMessages] = useState({
    name: "",
    linkedin: "",
    location: "",
    email: "",
    phone: "",
    periodicity: ""
  });
  const [showAlerts, setShowAlerts] = useState({
    name: false,
    linkedin: false,
    location: false,
    email: false,
    phone: false,
    periodicity: false,
    methodName: false,
    methodDescription: false
  });
  const [editIndex, setEditIndex] = useState(null);

  const [activeMenu, setActiveMenu] = useState("Admin");
  const [adminTab, setAdminTab] = useState("Company Management");
  const [companies, setCompanies] = useState([
    {
      name: "Company A",
      linkedin: "https://linkedin.com/company-a",
      location: "New York",
      email: "contact@companya.com",
      phone: "1234567890",
      periodicity: "Every 14 days",
    },
    {
      name: "Company B",
      linkedin: "https://linkedin.com/company-b",
      location: "San Francisco",
      email: "contact@companyb.com",
      phone: "9876543210",
      periodicity: "Every 7 days",
    },
  ]);
  const handleDeleteCompany = (index) => {
    const updatedCompanies = companies.filter((_, i) => i !== index);
    setCompanies(updatedCompanies);
  };
  
  const handleEditCompany = (index) => {
    setNewCompany({
      ...companies[index],
      periodicity: companies[index].periodicity.split(" ")[1] // Extract only the number (assumes format "Every X days")
    });
    setShowPopup(true);
    setEditIndex(index);
  };
  
  const handleSaveEdit = () => {
    if (!newCompany.name || !newCompany.linkedin || !newCompany.location || !newCompany.email || !newCompany.phone) {
      alert("All fields are required.");
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newCompany.email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    if (newCompany.phone.length !== 10 || !/^[0-9]+$/.test(newCompany.phone)) {
      alert("Phone number must be 10 digits.");
      return;
    }
    if (!/^[0-9]+$/.test(newCompany.periodicity)) {
      alert("Periodicity must be a number");
      return;
    }
  
    const updatedCompanies = [...companies];
    updatedCompanies[editIndex] = { ...newCompany, periodicity: `Every ${newCompany.periodicity} days` };
    setCompanies(updatedCompanies);
  
    setNewCompany({
      name: "",
      linkedin: "",
      location: "",
      email: "",
      phone: "",
      periodicity: "",
    });
    setShowPopup(false);
    setEditIndex(null);
  };
  
  
  const handleBlur = (event, field) => {
    const value = event.target.value;
    if (value.trim() === "") {
      setAlertMessages((prev) => ({ ...prev, [field]: "This field cannot be empty!" }));
      setShowAlerts((prev) => ({ ...prev, [field]: true }));
    } else {
      setAlertMessages((prev) => ({ ...prev, [field]: "" }));
      setShowAlerts((prev) => ({ ...prev, [field]: false }));
    }
  };

  const [showPopup, setShowPopup] = useState(false);
  const [newCompany, setNewCompany] = useState({
    name: "",
    linkedin: "",
    location: "",
    email: "",
    phone: "",
    periodicity: "",
  });
  const handleCancel = () => {
    setShowPopup(false);
    setAlertMessages({
      name: "",
      linkedin: "",
      location: "",
      email: "",
      phone: "",
      periodicity: ""
    });
    setShowAlerts({
      name: false,
      linkedin: false,
      location: false,
      email: false,
      phone: false,
      periodicity: false
    });
    setNewCompany({
      name: "",
      linkedin: "",
      location: "",
      email: "",
      phone: "",
      periodicity: ""
    });
  };
  const handleCancels = () => {
    setShowPopups(false);
    setNewMethod({
      name: "",
      description: "",
      sequence: 0,
      mandatory: false,
    });
  };
  
  const handleShowPopup = () => {
    setAlertMessages({
      name: "",
      linkedin: "",
      location: "",
      email: "",
      phone: "",
      periodicity: ""
    });
    setShowAlerts({
      name: false,
      linkedin: false,
      location: false,
      email: false,
      phone: false,
      periodicity: false
    });
    setNewCompany({
      name: "",
      linkedin: "",
      location: "",
      email: "",
      phone: "",
      periodicity: ""
    });
    setEditIndex(null); 
    setShowPopup(true);
  };
  
  const handleAddCompany = () => {
    if (!newCompany.name || !newCompany.linkedin || !newCompany.location || !newCompany.email || !newCompany.phone) {
      alert("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newCompany.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (newCompany.phone.length !== 10 || !/^[0-9]+$/.test(newCompany.phone)) {
      alert("Phone number must be 10 digits.");
      return;
    }
    if (!/^[0-9]+$/.test(newCompany.periodicity)) {
      alert("Periodicity must be a number");
      return;
    }
    

    const updatedPeriodicity = `Every ${newCompany.periodicity} days`;

    setCompanies([...companies, { ...newCompany, periodicity: updatedPeriodicity }]);
    setNewCompany({
      name: "",
      linkedin: "",
      location: "",
      email: "",
      phone: "",
      periodicity: "",
    });
    setShowPopup(false);
  };
  const [alertMessage, setAlertMessage] = useState({
    name: "",
    linkedin: "",
    location: "",
    email: "",
    phone: "",
    periodicity: "",
    methodName: "",
    methodDescription: "",
  });
  const [showAlert, setShowAlert] = useState({
    name: false,
    linkedin: false,
    location: false,
    email: false,
    phone: false,
    periodicity: false,
    methodName: false,
    methodDescription: false,
  });
  const [editIndexs, setEditIndexs] = useState(null);

  
  
  const [communicationMethods, setCommunicationMethods] = useState([
    { name: "LinkedIn Post", description: "Post on LinkedIn", sequence: 1, mandatory: true },
    { name: "LinkedIn Message", description: "Message via LinkedIn", sequence: 2, mandatory: true },
    { name: "Email", description: "Send an email", sequence: 3, mandatory: true },
    { name: "Phone Call", description: "Call the company", sequence: 4, mandatory: false },
    { name: "Other", description: "Any other method", sequence: 5, mandatory: false },
  ]);

  const handleDeleteMethod = (index) => {
    const updatedMethods = communicationMethods.filter((_, i) => i !== index);
    setCommunicationMethods(updatedMethods);
  };

  const handleEditMethod = (index) => {
    setNewMethod({ ...communicationMethods[index] });
    setShowPopups(true);
    setEditIndexs(index);
  };

  const handleSaveEditMethod = () => {
    if (!newMethod.name || !newMethod.description) {
      alert("All fields are required.");
      return;
    }

    const updatedMethods = [...communicationMethods];
    updatedMethods[editIndexs] = { ...newMethod };
    setCommunicationMethods(updatedMethods);

    setNewMethod({
      name: "",
      description: "",
      sequence: 0,
      mandatory: false,
    });
    setShowPopup(false);
    setEditIndexs(null);
  };

  const handleAddMethod = () => {
    if (!newMethod.name || !newMethod.description) {
      alert("All fields are required.");
      return;
    }

    const updatedMethods = [...communicationMethods, { ...newMethod }];
    setCommunicationMethods(updatedMethods);
    setNewMethod({
      name: "",
      description: "",
      sequence: 0,
      mandatory: false,
    });
    setShowPopups(false);
  };

  const renderContent = () => {
    if (activeMenu === "Admin") {
      return (
        <div>
          <div className="admin-header">
            <button
              className={adminTab === "Company Management" ? "active" : ""}
              onClick={() => setAdminTab("Company Management")}
            >
              Company Management
            </button>
            <button
              className={adminTab === "Communication Methods" ? "active" : ""}
              onClick={() => setAdminTab("Communication Methods")}
            >
              Communication Methods
            </button>
          </div>
          {adminTab === "Company Management" && renderCompanyManagement()}
          {adminTab === "Communication Methods" && renderCommunicationMethods()}
        </div>
      );
    }
    else if (activeMenu === "User") {
      return <User />;
    }
    return <Report />;
  };
  

  const renderCompanyManagement = () => {
    return (
      <div>
        <button className="company-button" onClick={handleShowPopup}>
  Add Company
</button>
        {companies.map((company, index) => (
          <div className="rectangle full-width" key={index}>
            <div className="rectangle-grid">
              <div className="contentt">
                <h3>{company.name}</h3>
                <p>
                  <a href={company.linkedin} target="_blank" rel="noopener noreferrer">
                    {company.linkedin}
                  </a>
                </p>
                <div className="line"></div>
                <div className="grid-details">
                  <div>
                    <p>Location:</p>
                    <p>{company.location}</p>
                  </div>
                  <div>
                    <p>Email:</p>
                    <p>{company.email}</p>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <p>{company.phone}</p>
                  </div>
                  <div>
                    <p>Communication Period:</p>
                    <p>{company.periodicity}</p>
                  </div>
                </div>
              </div>
              <div className="right-buttons">
  <button onClick={() => handleEditCompany(index)}>Edit</button>
  <button onClick={() => handleDeleteCompany(index)}>Delete</button>
</div>

            </div>
          </div>
        ))}
      </div>
    );
  };
  const renderCommunicationMethods = () => {
    return (
      <div>
        <button className="company-buttons" onClick={handleShowPopups}>
          Add Communication Method
        </button>
        {communicationMethods.map((method, index) => (
          <div className="rectangle full-width" key={index}>
            <div className="rectangle-grid">
              <div className="contentt">
                <h3>{method.name}</h3>
                <p>{method.description}</p>
                <div className="line"></div>
                <p>Sequence: {method.sequence}</p>
                <p>Mandatory: {method.mandatory ? "Yes" : "No"}</p>
              </div>
              <div className="right-buttons">
                <button onClick={() => handleEditMethod(index)}>Edit</button>
                <button onClick={() => handleDeleteMethod(index)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  const [showPopups, setShowPopups] = useState(false);
  const [newMethod, setNewMethod] = useState({
    name: "",
    description: "",
    sequence: 0,
    mandatory: false,
  });
  const handleShowPopups = () => {
    setAlertMessage({
      name: "",
      linkedin: "",
      location: "",
      email: "",
      phone: "",
      periodicity: ""
    });
    setShowAlert({
      name: false,
      linkedin: false,
      location: false,
      email: false,
      phone: false,
      periodicity: false
    });
    setNewMethod({
      name: "",
      description: "",
      sequence: 0,
      mandatory: false,
    });
    setShowPopups(true);
    setEditIndexs(null);
  };

  return (
    <div>
      {/* Header Bar */}
      <header className="header">
        <div className="header-content">
          <span className="icon">📅</span>
          <h1>ConnectCal</h1>
        </div>
      </header>

      {/* Main App Content */}
      <div className="app">
        <div className="sidebar">
          <div
            className={`menu-item ${activeMenu === "Admin" ? "active" : ""}`}
            onClick={() => setActiveMenu("Admin")}
          >
            Admin
          </div>
          <div
            className={`menu-item ${activeMenu === "User" ? "active" : ""}`}
            onClick={() => setActiveMenu("User")}
          >
            User
          </div>
          <div
            className={`menu-item ${activeMenu === "Reports" ? "active" : ""}`}
            onClick={() => setActiveMenu("Reports")}
          >
            Reports
          </div>
        </div>
        <div className="content">{renderContent()}</div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
          <h2>{editIndex === null ? "Add New Company" : "Edit Company"}</h2>
            <label htmlFor="companyName">Company Name:</label>
            <input
              type="text"
              placeholder="Company Name"
              onBlur={(e) => handleBlur(e, "name")}
              value={newCompany.name}
              onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
            />
            {showAlerts.name && <div className="alert">{alertMessages.name}</div>}

            <label htmlFor="companyInfo">LinkedIn URL:</label>
            <input
              type="text"
              placeholder="LinkedIn Profile"
              onBlur={(e) => handleBlur(e, "linkedin")}
              value={newCompany.linkedin}
              onChange={(e) => setNewCompany({ ...newCompany, linkedin: e.target.value })}
            />
            {showAlerts.linkedin && <div className="alert">{alertMessages.linkedin}</div>}

            <label htmlFor="companyInfo">Location:</label>
            <input
              type="text"
              placeholder="Location"
              onBlur={(e) => handleBlur(e, "location")}
              value={newCompany.location}
              onChange={(e) => setNewCompany({ ...newCompany, location: e.target.value })}
            />
            {showAlerts.location && <div className="alert">{alertMessages.location}</div>}

            <label htmlFor="companyInfo">Email:</label>
            <input
              type="email"
              placeholder="Email"
              onBlur={(e) => handleBlur(e, "email")}
              value={newCompany.email}
              onChange={(e) => setNewCompany({ ...newCompany, email: e.target.value })}
            />
            {showAlerts.email && <div className="alert">{alertMessages.email}</div>}

            <label htmlFor="companyInfo">Phone Number:</label>
            <input
              type="text"
              placeholder="Phone Number"
              onBlur={(e) => handleBlur(e, "phone")}
              value={newCompany.phone}
              onChange={(e) => setNewCompany({ ...newCompany, phone: e.target.value })}
            />
            {showAlerts.phone && <div className="alert">{alertMessages.phone}</div>}

            <label htmlFor="companyInfo">Communication Periodicity (in days):</label>
            <input
              type="text"
              placeholder="Communication Periodicity"
              onBlur={(e) => handleBlur(e, "periodicity")}
              value={newCompany.periodicity}
              onChange={(e) => setNewCompany({ ...newCompany, periodicity: e.target.value })}
            />
            {showAlerts.periodicity && <div className="alert">{alertMessages.periodicity}</div>}

            <div className="popup-buttons">

  {editIndex === null ? (
    <button onClick={handleAddCompany}>Add</button>
  ) : (
    <button onClick={handleSaveEdit}>Save</button>
  )}
  <button onClick={handleCancel}>Cancel</button>
</div>
          </div>
        </div>
      )}
      {showPopups && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>{editIndexs === null ? "Add Communication Method" : "Edit Communication Method"}</h2>
            <label htmlFor="methodName">Communication Method Name:</label>
            <input
              type="text"
              value={newMethod.name}
              onChange={(e) => setNewMethod({ ...newMethod, name: e.target.value })}
            />
            {showAlert.methodName && <div className="alert">{alertMessage.methodName}</div>}

            <label htmlFor="methodDescription">Description:</label>
            <input
              type="text"
              value={newMethod.description}
              onChange={(e) => setNewMethod({ ...newMethod, description: e.target.value })}
            />
            {showAlert.methodDescription && <div className="alert">{alertMessage.methodDescription}</div>}

            <label htmlFor="methodSequence">Sequence:</label>
            <input
              type="number"
              value={newMethod.sequence}
              onChange={(e) => setNewMethod({ ...newMethod, sequence: parseInt(e.target.value) })}
            />

            <label htmlFor="methodMandatory">Mandatory:</label>
            <input
              type="checkbox"
              checked={newMethod.mandatory}
              onChange={(e) => setNewMethod({ ...newMethod, mandatory: e.target.checked })}
            />

            <div className="popup-buttons">
              {editIndexs === null ? (
                <button onClick={handleAddMethod}>Add</button>
              ) : (
                <button onClick={handleSaveEditMethod}>Save</button>
              )}
              <button onClick={handleCancels}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;