# Gfg-Hackathon-RegionalRound-Server

## Project Overview

This repository contains the backend code for the Gfg-Hackathon-RegionalRound-Server project, developed as part of the "Solving for India" hackathon at Pune (regional level). Our project aims to connect loan seekers with loan providers, providing a seamless platform for financial assistance.

## Team and Event

- **Hackathon**: Solving for India
- **Level**: Regional Round at Pune
- **University Round Selection**: Our team was selected from the university round to participate in this regional round.

## Features

- **User Authentication**: Secure login and registration for loan seekers and providers.
- **Loan Matching**: Efficient algorithms to match loan seekers with suitable loan providers based on predefined criteria.
- **Loan Application**: Seamless process for loan seekers to apply for loans.
- **Loan Approval**: Easy-to-use interface for loan providers to review and approve loan applications.
- **Notifications**: Real-time notifications for updates on loan applications and approvals.

## Technologies Used

- **Backend Framework**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Real-time Updates**: Socket.io

## Setup and Installation

### Prerequisites

- Node.js (v14.x or later)
- MongoDB

### Installation Steps

1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-username/Gfg-Hackathon-RegionalRound-Server.git
   cd Gfg-Hackathon-RegionalRound-Server
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the Server**
   ```sh
   npm start
   ```

## API Endpoints

### User Authentication

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Login a user.

### Loan Management

- **POST /api/loans/apply**: Apply for a loan.
- **GET /api/loans**: Get all loan applications.
- **POST /api/loans/approve/:id**: Approve a loan application.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a pull request.


---

Thank you for checking out our project! We hope this platform will make a significant impact in connecting loan seekers with providers.
