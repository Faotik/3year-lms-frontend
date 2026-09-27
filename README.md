# Moodle Frontend

This is a frontend for **LiteLerner** LMS built with **React**, **Material UI (MUI)**. 
The project provide responsive, flexible interface for students, teachers, and admins to interact with the  Backend APIs calls.

## 1. Navigation

- [1. Navigation](#1-navigation)
- [2. Project Overview](#2-project-overview)
- [3. System Architecture](#3-system-architecture)
- [4. Project Structure](#4-project-structure)
- [5. Installation & Setup](#5-installation--setup)
- [6. Running the Project](#6-running-the-project)
- [7. Authentication](#7-authentication)
- [8. Routing & Pages](#8-routing--pages)
- [9. Services Layer](#9-services-layer)
- [10. Role-Based Access Control](#10-role-based-access-control)

## 2. Project Overview

- **User roles**: `student`, `teacher`, `admin`.
- **Main features**:
    - Dynamic and interactive dashboards for different roles.
    - Module, assignment, submissions and tests management.
    - Test/Quiz taking interface.
    - Admin panel for platform management.
    - Responsive design using Material UI.
    - 

## 3. System Architecture

- **Architecture**: The application is a Single Page Application where routing is handled client-side by `react-router-dom`.
- **Services**: API calls are stored into a `src/services` directory, for modularity and isolation.
- **Component-Based Design**: Platform built with using reusable components to form UI.
- **Authentication Flow**:
    - User logs in via `LoginPage`.
    - Backend sets a session cookie.
    - Frontend maintains user state and role to conditionalize rendering.
- **Data Fetching**: Components use `useEffect` to fetch data from the services layer.

## 4. Project Structure
```text
3year-moodle-frontend/
├── public/
├── src/
│   ├── app/
│   │   └── App.js          # Main routing and entry point
│   ├── components/
│   │   ├── common/         # Global shared components
│   │   ├── layout/         # Components used across different pages
│   │   └── ui/             # Basic UI elements
│   ├── pages/              # Pages used for routing
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── AdminPanel.jsx
│   │   ├── Modules.jsx
│   │   ├── Module.jsx
│   │   ├── Submitions.jsx
│   │   └── Test.jsx
│   ├── services/           # API interaction functions 
│   ├── styles/             # Global CSS
│   ├── assets/             # Images and other assets
│   ├── index.js            # React entering point
├── package.json
└── .env.template
```

## 5. Installation & Setup

### Prerequisites
- Node.js (v18+)
- npm

### Clone and install
```bash
git clone https://github.com/Faotik/3year-moodle-frontend
cd 3year-moodle-frontend
npm install
```

### Configure environment
Create a `.env` file from .env.template in the root directory and set the backend API URL:
```env
REACT_APP_API_URL=http://localhost:5000
```

## 6. Running the Project

### Development mode
```bash
npm start
```
Starts the development server at `http://localhost:3000`.

## 7. Authentication

The frontend relies on **Session-based authentication** provided by the backend. 
1. The user enter is  credentials on the `Login` page.
2. The backend validates and sets a `connect.sid` cookie.
3. The frontend verifies authentication state by calling `checkAuth` service.

To login into the account accessing role based features you can use 1 of pre-registered users.

| Student Name | Role    | Email            | Password |
|--------------|---------|------------------|----------|
| User1        | student | email1@email.com | 1        |
| User2        | student | email2@email.com | 1        |
| Teacher1     | teacher | email3@email.com | 1        |
| Teacher2     | teacher | email4@email.com | 1        |
| Admin        | admin   | email5@email.com | 1        |

## 8. Routing & Pages

Routes are defined in `src/app/App.js`:

| Path                                  | Page         | Access        |
|---------------------------------------|--------------|---------------|
| /                                     | `Home`       | Public        |
| `/login`                              | `Login`      | Public        |
| `/`                                   | `Dashboard`  | Authenticated |
| `/modules`                            | `Modules`    | Authenticated |
| `/modules/:id`                        | `Module`     | Authenticated |
| `/admin-panel`                        | `AdminPanel` | Admin         |
| `/modules/assignments/:id/submitions` | `Submitions` | Teacher/Admin |
| `/modules/tests/:id`                  | `Test`       | Student       |

## 9. Services Layer

The `src/services` directory contains API operations stored individual, one request in separate file.
Examples:
- `login.js`: Handles user authentication.
- `getModules.js`: Fetches list of modules.
- `addAssignment.js`: Handles assignment creation for teachers.

## 10. Role-Based Access Control

The frontend implements role-based rendering:
- **Admin**: Access to `AdminPanel`, showing platform statistic, giving access for user management, module management.
- **Teacher**: Access to assignments management and viewing submissions linked to created assignments.
- **Student**: Access to module content, assignment submission, and tests.
