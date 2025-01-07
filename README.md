1. Prerequisites
Before setting up the application, ensure the following are installed on your system:

Node.js (version 14 or higher) Download Node.js
npm (Node Package Manager) or yarn (comes with Node.js)
Git Download Git
A code editor (e.g., VS Code)
React Dev Tools for debugging React applications.
2. Clone the Repository
Go to your GitHub repository for ConnectCal.
Copy the repository URL.
Open your terminal and run:

git clone https://github.com/username/ConnectCal.git
Navigate to the project directory:

cd ConnectCal
3. Install Dependencies
Run the following command to install all necessary packages:


npm install
This will install all the dependencies listed in the package.json file, including:

react
react-chartjs-2
chart.js
jspdf
Other required libraries.
4. Environment Variables
Create a .env file in the root directory.
Add necessary environment variables (if applicable). Example:

REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_API_KEY=your_api_key
Replace these with the actual values needed for your app.
5. Run the Application
Start the development server:



npm start
This will open the app in your default browser at http://localhost:3000.

Deployment Instructions
1. Build the Application
Create a production build of the app:



npm run build
This will generate optimized files in the build/ directory.

2. Deploy Using GitHub Pages (Optional)
Install the GitHub Pages package:


npm install gh-pages --save-dev
Add the following scripts to your package.json:
json

"homepage": "https://username.github.io/ConnectCal",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
Deploy the app:


npm run deploy
3. Deploy to Other Platforms
Netlify: Drag and drop the build/ folder or use the Netlify CLI.
Vercel: Connect your GitHub repo and let Vercel handle the deployment.
Heroku: Use the Heroku CLI to deploy the build.
Application Functionality
Core Features
Dashboard Tab:

Displays communication history and upcoming tasks for companies.
Highlights overdue and today’s communications.
Calendar Tab:

Interactive calendar with navigation arrows for months.
Shows communication schedules for selected companies.
Notifications Tab:

Summarizes overdue and today's communications.
Allows quick access to details for follow-up.
Reports Tab:

Communication frequency reports (bar and pie charts).
Engagement effectiveness metrics (e.g., response rates).
Overdue communication trends (trendline or heatmap).
Real-time activity logs.
Exportable reports (PDF and CSV).
Communication Logging:

Add new communications via popups, specifying type, date, and notes.
Automatically clears overdue flags for selected companies.