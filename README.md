GrowthProAI Local Business Dashboard
A full-stack application that simulates how small businesses might view their SEO content and Google Business data. Built with React (frontend) and Node.js/Express (backend).
🚀 Features

Business Analytics Input: Enter business name and location
Simulated Google Data: View rating, reviews, and SEO headlines
Dynamic SEO Headlines: AI-generated headlines with regeneration feature
Responsive Design: Mobile-friendly interface using Tailwind CSS
Loading States: Visual feedback during API calls
Form Validation: Client-side validation for user inputs

🛠️ Technology Stack
Frontend

React 18
Tailwind CSS
Lucide React (icons)
Axios (HTTP client)

Backend

Node.js
Express.js
CORS middleware

📁 Project Structure
business-dashboard/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── BusinessDashboard.js
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
├── backend/
│   ├── server.js
│   └── package.json
└── README.md
🚀 Getting Started
Prerequisites

Node.js (v14 or higher)
npm or yarn

Backend Setup

Navigate to backend directory:
bashcd backend

Install dependencies:
bashnpm install

Start the server:
bash# Development mode with auto-reload
npm run dev

# Production mode
npm start
The backend will run on http://localhost:5000

Frontend Setup

Navigate to frontend directory:
bashcd frontend

Install dependencies:
bashnpm install

Install and configure Tailwind CSS:
bashnpm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

Configure Tailwind CSS:
Update tailwind.config.js:
javascriptmodule.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
Add to src/index.css:
css@tailwind base;
@tailwind components;
@tailwind utilities;

Start the development server:
bashnpm start
The frontend will run on http://localhost:3000

🔧 API Endpoints
POST /business-data
Description: Get simulated business analytics data
Request Body:
json{
  "name": "Cake & Co",
  "location": "Mumbai"
}
Response:
json{
  "rating": 4.3,
  "reviews": 127,
  "headline": "Why Cake & Co is Mumbai's Sweetest Spot in 2025"
}
GET /regenerate-headline
Description: Generate a new SEO headline
Query Parameters:

name: Business name
location: Business location

Example:
GET /regenerate-headline?name=Cake%20&%20Co&location=Mumbai
Response:
json{
  "headline": "Discover Cake & Co: Mumbai's Premium Destination"
}
GET /health
Description: Health check endpoint
Response:
json{
  "status": "OK",
  "timestamp": "2025-01-01T00:00:00.000Z",
  "uptime": 3600
}
🎯 How to Use

Start both servers (backend on port 5000, frontend on port 3000)
Open the dashboard in your browser at http://localhost:3000
Enter business information:

Business Name (e.g., "Cake & Co")
Location (e.g., "Mumbai")


Click "Analyze Business" to fetch simulated data
View the results:

Google rating (3.5-5.0 stars)
Number of reviews (50-550)
AI-generated SEO headline


Click "Regenerate" to get a new SEO headline

📱 Responsive Design
The dashboard is fully responsive and works on:

📱 Mobile devices (320px+)
📱 Tablets (768px+)
💻 Desktop computers (1024px+)