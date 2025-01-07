import React, { useState } from "react";
import "./Report.css";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import jsPDF from "jspdf";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Report() {
  const [filter, setFilter] = useState({
    company: "",
    method: "",
    dateRange: { start: "", end: "" },
  });
  const [activityLog] = useState([
    { user: "John Doe", company: "Company A", type: "Email", date: "2025-01-02" },
    { user: "Jane Smith", company: "Company B", type: "Call", date: "2025-01-01" },
    { user: "Alice Brown", company: "Company C", type: "LinkedIn Post", date: "2025-01-03" },
    { user: "Mark Green", company: "Company A", type: "Call", date: "2025-01-04" },
    { user: "Emma Watson", company: "Company B", type: "Email", date: "2025-01-05" },
  ]);
  const [filteredLog, setFilteredLog] = useState(activityLog);

  const [communicationFrequencyData, setCommunicationFrequencyData] = useState({
    labels: ["Email", "Call", "LinkedIn Post"],
    datasets: [
      {
        label: "Frequency",
        data: [50, 30, 20],
        backgroundColor: ["#007bff", "#28a745", "#ffc107"],
      },
    ],
  });

  const [engagementEffectivenessData, setEngagementEffectivenessData] = useState({
    labels: ["Email", "Call", "LinkedIn Post"],
    datasets: [
      {
        label: "Success Rate (%)",
        data: [60, 40, 70],
        backgroundColor: ["#17a2b8", "#dc3545", "#fd7e14"],
      },
    ],
  });
  const fixedOverdueTrendData = {
    "Company A": [5, 10, 7, 8, 6], // Example overdue trend for Company A
    "Company B": [4, 6, 8, 9, 10], // Example overdue trend for Company B
    "Company C": [7, 5, 6, 4, 8],  // Example overdue trend for Company C
  };
  const companyColors = {
    "Company A": "#007bff",
    "Company B": "#28a745",
    "Company C": "#ffc107",
  };
  
  const [overdueTrendData, setOverdueTrendData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: Object.keys(fixedOverdueTrendData).map((company) => ({
      label: company,
      data: fixedOverdueTrendData[company],
      backgroundColor: "rgba(0, 0, 0, 0)", // Transparent background
      borderColor: companyColors[company], // Predefined color
      borderWidth: 2,
    })),
  });

  const companies = ["Company A", "Company B", "Company C"];
  const methods = ["Email", "Call", "LinkedIn Post"];

  // Fixed data for Engagement Effectiveness and Overdue Trends
  const fixedEffectivenessData = {
    "Company A": [70, 50, 60], // Example success rates for Company A
    "Company B": [60, 40, 50], // Example success rates for Company B
    "Company C": [50, 70, 80], // Example success rates for Company C
  };

  

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      dateRange: { ...prev.dateRange, [name]: value },
    }));
  };

  const applyFilter = () => {
    // Filter activityLog
    const filtered = activityLog.filter((log) => {
      const matchesCompany = !filter.company || log.company === filter.company;
      const matchesMethod = !filter.method || log.type === filter.method;
      const matchesDate =
        (!filter.dateRange.start || new Date(log.date) >= new Date(filter.dateRange.start)) &&
        (!filter.dateRange.end || new Date(log.date) <= new Date(filter.dateRange.end));
      return matchesCompany && matchesMethod && matchesDate;
    });
  
    setFilteredLog(filtered);

    // Update Communication Frequency
    const communicationCounts = methods.map(
      (method) => filtered.filter((log) => log.type === method).length
    );
    setCommunicationFrequencyData((prev) => ({
      ...prev,
      datasets: [{ ...prev.datasets[0], data: communicationCounts }],
    }));
 
    if (!filter.company) {
  const datasets = Object.keys(fixedOverdueTrendData).map((company) => ({
    label: company,
    data: fixedOverdueTrendData[company],
    backgroundColor: "rgba(0, 0, 0, 0)", // Transparent background
    borderColor: companyColors[company], // Predefined color
    borderWidth: 2,
  }));

  setOverdueTrendData((prev) => ({
    ...prev,
    datasets,
  }));
}
    // Update Engagement Effectiveness (only based on company filter)
    if (filter.company) {
      // If a specific company is selected, use its fixed data
      setEngagementEffectivenessData((prev) => ({
        ...prev,
        datasets: [
          {
            ...prev.datasets[0],
            data: fixedEffectivenessData[filter.company] || [0, 0, 0],
          },
        ],
      }));
  
     // Update Overdue Trends
     setOverdueTrendData((prev) => ({
      ...prev,
      datasets: [
        {
          label: filter.company,
          data: fixedOverdueTrendData[filter.company] || [0, 0, 0, 0, 0],
          backgroundColor: "rgba(111, 66, 193, 0.2)",
          borderColor: "#6f42c1",
          borderWidth: 2,
        },
      ],
    }));
  }  else {
    // If "All Companies" is selected, aggregate data for all companies
    const aggregatedEffectivenessData = [0, 0, 0];
    const aggregatedOverdueTrendData = [0, 0, 0, 0, 0];

    Object.keys(fixedEffectivenessData).forEach((company) => {
      fixedEffectivenessData[company].forEach((value, index) => {
        aggregatedEffectivenessData[index] += value;
      });
    });

    const datasets = Object.keys(fixedOverdueTrendData).map((company) => ({
      label: company,
      data: fixedOverdueTrendData[company],
      backgroundColor: "rgba(0, 0, 0, 0)", // Transparent background
      borderColor: companyColors[company], // Predefined color
      borderWidth: 2,
    }));
    

    setEngagementEffectivenessData((prev) => ({
      ...prev,
      datasets: [
        {
          ...prev.datasets[0],
          data: aggregatedEffectivenessData,
        },
      ],
    }));

    setOverdueTrendData((prev) => ({
      ...prev,
      datasets,
    }));
  }};
  
  
  const exportReport = (type) => {
    if (type === "PDF") {
      const doc = new jsPDF();
      doc.text("Report", 10, 10);
      doc.save("report.pdf");
    } else if (type === "CSV") {
      const csvContent =
        "data:text/csv;charset=utf-8," +
        filteredLog.map((log) => Object.values(log).join(",")).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "report.csv");
      document.body.appendChild(link);
      link.click();
    }
  };

  return (
    <div className="report-container">
      <h1>Reports</h1>
      <div className="filter-section">
        <label>
          Company:
          <select name="company" value={filter.company} onChange={handleFilterChange}>
            <option value="">All Companies</option>
            {companies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        </label>
        <label>
          Method:
          <select name="method" value={filter.method} onChange={handleFilterChange}>
            <option value="">All Methods</option>
            {methods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </label>
        <label>
          From Date:
          <input type="date" name="start" value={filter.dateRange.start} onChange={handleDateChange} />
        </label>
        <label>
          To Date:
          <input type="date" name="end" value={filter.dateRange.end} onChange={handleDateChange} />
        </label>
        <button className="buttonn"onClick={applyFilter}>Filter</button>
      </div>

      <div className="chart-section">
        <div className="chart">
          <h2>Communication Frequency</h2>
          <Bar key="frequency-chart" data={communicationFrequencyData} />
        </div>
        <div className="chart">
          <h2>Engagement Effectiveness</h2>
          <Pie key="effectiveness-chart" data={engagementEffectivenessData} />
        </div>
        <div className="chart">
          <h2>Overdue Communication Trends</h2>
          <Line key="overdue-chart" data={overdueTrendData} />
        </div>
      </div>

      <div className="activity-log">
        <h2>Real-Time Activity Log</h2>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Company</th>
              <th>Type</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredLog.map((log, index) => (
              <tr key={index}>
                <td>{log.user}</td>
                <td>{log.company}</td>
                <td>{log.type}</td>
                <td>{log.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="export-buttons">
        <button onClick={() => exportReport("PDF")}>Export as PDF</button>
        <button onClick={() => exportReport("CSV")}>Export as CSV</button>
      </div>
    </div>
  );
}

export default Report;
