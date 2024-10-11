# MERN Stack Coding Challenge

This is a full-stack application built using the MERN stack (MongoDB, Express.js, React, and Node.js). The application allows users to manage transactions, view statistics, and visualize data with charts.

## Table of Contents

- [Features](#features)
- [Sample Screenshots](#sample-screenshots)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
## Features

- CRUD operations for transactions
- View transaction statistics
- Visualization of data using charts
- Responsive design using Tailwind CSS

## Sample Screenshots
### Header
![image](https://github.com/user-attachments/assets/d67c2125-a46d-4c0f-b3b1-bedfeebc7ea6)
### Transactions Table 
![image](https://github.com/user-attachments/assets/e7a83570-95bb-459a-bf8d-2a10639d33f9)
### Statistics
![image](https://github.com/user-attachments/assets/e659fbed-8647-4b80-87e1-23cb835fe4a7)
### Bar Chart Stats
![image](https://github.com/user-attachments/assets/13117035-7afd-4bf1-ad32-bba671eebc3f)
### Pie Chart 
![image](https://github.com/user-attachments/assets/cecaecbd-9985-4bfb-afb1-ccb2b196fd27)


## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Charting Libraries:** Chart.js (for Bar and Pie charts)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (either locally or via [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- [Git](https://git-scm.com/)

## Setup and Installation

### Clone the Repository

```bash
git clone https://github.com/amarpakhare/roxilar_solution.git
cd roxilar_solution
```
## Backend Setup
### Navigate to the backend directory:
```bash
cd server
```
### Install the dependencies:
```bash
npm install
```

### Create a .env file in the 'server' directory and add your MongoDB URI:
```bash
PORT=8000
MONGODB_URI=mongodb://localhost:27017
CORS_ORIGIN=*
```
### Go to 'server\src\constants.js' and add the MongoDB database name
```bash
export const DB_NAME = "YOUR_DB_NAME"
```

### Start the backend server:
```bash
npm run dev
```

## Frontend Setup

### Navigate to the frontend directory:
```bash
cd ../frontend
```

### Install dependencies: 
```bash
npm install
```

### Start the Frontend:
```bash
npm run dev
```

