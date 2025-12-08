# Chakri

A full-stack job portal application built with React and Node.js.

🔗 **Live Demo**: https://chakri-1.onrender.com/

📦 **Source Code**: https://github.com/Md-Minhajul-Islam/Chakri/tree/main

## Project Structure

```
Chakri/
│
├── backend/                          # Backend server (Node.js/Express)
│   ├── controllers/                  # Request handlers
│   │   ├── application.controller.js
│   │   ├── company.controller.js
│   │   ├── job.controller.js
│   │   └── user.controller.js
│   │
│   ├── middlewares/                  # Custom middleware functions
│   │   ├── common/
│   │   │   ├── errorHandler.js
│   │   │   └── isAuthenticated.js
│   │   └── multer.js                 # File upload middleware
│   │
│   ├── models/                       # Database models
│   │   ├── application.model.js
│   │   ├── company.model.js
│   │   ├── job.model.js
│   │   └── user.model.js
│   │
│   ├── router/                       # API routes
│   │   ├── application.route.js
│   │   ├── company.route.js
│   │   ├── job.route.js
│   │   └── user.route.js
│   │
│   ├── utils/                        # Utility functions
│   │   ├── cloudinary.js             # Cloudinary integration
│   │   ├── datauri.js                # Data URI conversion
│   │   └── db.js                     # Database connection
│   │
│   ├── node_modules/                 # Backend dependencies
│   ├── package.json
│   ├── package-lock.json
│   └── server.js                     # Entry point
│
├── frontend/                         # Frontend application (React/Vite)
│   ├── public/                       # Static assets
│   │
│   ├── src/                          # Source code
│   │   ├── components/               # React components
│   │   │   ├── admin/                # Admin-specific components
│   │   │   │   ├── AdminJobs.jsx
│   │   │   │   ├── AdminJobsTable.jsx
│   │   │   │   ├── Applicants.jsx
│   │   │   │   ├── ApplicantsTable.jsx
│   │   │   │   ├── Companies.jsx
│   │   │   │   ├── CompaniesTable.jsx
│   │   │   │   ├── CompanyCreate.jsx
│   │   │   │   ├── CompanySetup.jsx
│   │   │   │   ├── PostJob.jsx
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   │
│   │   │   ├── auth/                 # Authentication components
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Signup.jsx
│   │   │   │
│   │   │   ├── shared/               # Shared/common components
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Navbar.jsx
│   │   │   │
│   │   │   ├── AppliedJobTable.jsx
│   │   │   ├── Browse.jsx
│   │   │   ├── CategoryCarousel.jsx
│   │   │   ├── FilterCard.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Job.jsx
│   │   │   ├── JobDescription.jsx
│   │   │   ├── Jobs.jsx
│   │   │   ├── LatestJobs.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── UpdateProfileDialogue.jsx
│   │   │
│   │   ├── hooks/                    # Custom React hooks
│   │   │   ├── useGetAllAdminJobs.jsx
│   │   │   ├── useGetAllAppliedJobs.jsx
│   │   │   ├── useGetAllCompanies.jsx
│   │   │   ├── useGetAllJobs.jsx
│   │   │   └── useGetCompanyById.jsx
│   │   │
│   │   ├── redux/                    # Redux state management
│   │   │   ├── applicationSlice.js
│   │   │   ├── authSlice.js
│   │   │   ├── companySlice.js
│   │   │   ├── jobSlice.js
│   │   │   └── store.js
│   │   │
│   │   ├── utils/                    # Frontend utilities
│   │   │   └── constants.js
│   │   │
│   │   ├── lib/                      # Library utilities
│   │   │   └── utils.js
│   │   │
│   │   ├── App.jsx                   # Main App component
│   │   ├── main.jsx                  # Entry point
│   │   └── index.css                 # Global styles
│   │
│   ├── components.json               # shadcn/ui configuration
│   ├── index.html                    # HTML template
│   ├── package.json
│   └── vite.config.js                # Vite configuration
│
└── README.md                         # This file
```

## Features

- **User Authentication**: Login and signup functionality
- **Job Management**: Browse, search, and apply for jobs
- **Company Management**: Company profiles and job postings
- **Admin Dashboard**: Admin panel for managing jobs, companies, and applicants
- **User Profile**: User profile management with update functionality
- **Application Tracking**: Track job applications

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB (via Mongoose)
- Cloudinary (for image uploads)
- Multer (for file handling)

### Frontend

- React
- Vite
- Redux (state management)
- shadcn/ui (UI components)
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB database
- Cloudinary account (for image uploads)

### Installation

1. Clone the repository
2. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

4. Configure environment variables in both backend and frontend

5. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

6. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

## License

This project is open source and available under the MIT License.
