# Linq-Contact-Manager

This is a basic contact manager application built with React for the frontend, Node.js and Express for the backend, and MongoDB for storing contact data. The application allows users to view, add, delete, and search contacts. The interface uses DaisyUI for styling, with both light and dark themes available for user preference.

**Features**

View the list of contacts.
Add new contacts with details (name, email).
Delete contacts from the list.
Search for contacts by name/email.
Light and Dark themes (using DaisyUI and TailwindCSS).
Responsive design with DaisyUI.

**Prerequisites**

Before you begin, make sure you have the following installed on your system:
Node.js (version 14 or higher)
MongoDB (or MongoDB Atlas for cloud-based database)
Git

**Project Setup**

**1. Clone the repository**

Start by cloning this repository to your local machine:
git clone https://github.com/yourusername/Linq-Contact-Manager.git
cd Linq-Contact-Manager

**2. Set Up the Backend (Express + MongoDB)**

a) Install Backend Dependencies
Navigate to the server/ directory and install the required dependencies:
cd server
npm install

b) Set Up MongoDB
If you're using MongoDB Atlas, sign up or log in to MongoDB Atlas and create a new cluster.
Get your connection string (MongoDB URI) and replace the <YOUR_MONGO_URI> placeholder in your .env file:
MONGO_URI=<YOUR_MONGO_URI>
DB_NAME=Linq
You can store this in the .env file located in the server/ directory.

c) Start the Backend
Start the server by running:
npm start
The backend will be available at http://localhost:3000.

**3. Set Up the Frontend (React + DaisyUI)**
a) Install Frontend Dependencies
Navigate to the client/ directory and install the required dependencies:
cd ../client
npm install

b) Start the Frontend
Run the following command to start the React development server:
npm run dev
The frontend will be available at http://localhost:5173.

**4. Running the Project**

Once both the backend and frontend are running, the contact manager should be accessible via your browser at:
Frontend: http://localhost:5173
Backend: http://localhost:3000








