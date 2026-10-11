# 🎓 Smart Campus Helpdesk System – Frontend

A modern, responsive, and role-based **React.js** web application developed for the **Smart Campus Helpdesk System**. The frontend provides an intuitive interface for **Students**, **Staff**, and **Administrators** to manage campus complaints through a secure, scalable, and user-friendly experience.

---

## 🚀 Project Overview

The Smart Campus Helpdesk Frontend enables seamless interaction between users and the backend services by consuming RESTful APIs built with Spring Boot. It includes authentication, complaint management, dashboards, search, filtering, sorting, pagination, and role-based navigation.

---

## ✨ Key Features

### 🔐 Authentication & Authorization

* JWT Authentication
* Role-Based Access Control (RBAC)
* Secure Login
* Email OTP Verification
* Protected Routes
* Persistent User Sessions

### 👨‍🎓 Student Module

* Register & Verify Account
* Login
* Student Dashboard
* Create Complaint
* View My Complaints
* Complaint Details
* Complaint History
* Dashboard Statistics

### 👨‍🔧 Staff Module

* Staff Dashboard
* View Assigned Complaints
* Update Complaint Status
* Complaint History
* Dashboard Analytics

### 👨‍💼 Admin Module

* Admin Dashboard
* Complaint Management
* Assign Complaints to Staff
* Staff Management
* Student Management
* Search Complaints
* Filter by Status
* Filter by Priority
* Multi-Parameter Filtering
* Sorting
* Dashboard Statistics

---

## ⚡ Core Functionalities

* Responsive UI Design
* REST API Integration
* JWT Token Management
* Role-Based Navigation
* Dynamic Dashboard
* Complaint Lifecycle Management
* Search Functionality
* Multi-Parameter Filtering
* Sorting
* Pagination
* Form Validation
* Loading States
* Error Handling
* Email Notification Integration (Backend Driven)

---

## 🛠️ Tech Stack

| Category        | Technologies      |
| --------------- | ----------------- |
| Framework       | React.js          |
| Routing         | React Router DOM  |
| HTTP Client     | Axios             |
| UI Framework    | Bootstrap 5       |
| Language        | JavaScript (ES6+) |
| Styling         | CSS3              |
| Package Manager | npm               |
| Build Tool      | Vite              |

---

## 📁 Project Structure

```text
src
│
├── api
│   └── axios.js
│
├── assets
│
├── components
│
├── pages
│   ├── Admin
│   ├── Staff
│   ├── Student
│   └── Authentication
│
├── services
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🔄 Application Workflow

```text
User Login
      │
      ▼
JWT Authentication
      │
      ▼
Role-Based Authorization
      │
      ▼
Dashboard
      │
      ▼
Complaint Management
      │
      ├── Create Complaint
      ├── View Complaints
      ├── Search
      ├── Filter
      ├── Sort
      ├── Assign Complaint
      └── Update Status
```

---

## 📡 Backend Integration

The frontend communicates with the backend using RESTful APIs for:

* Authentication APIs
* User Management APIs
* Complaint APIs
* Dashboard APIs
* Search APIs
* Filtering APIs
* Sorting APIs
* Complaint Assignment APIs
* Complaint History APIs
* Email Notification APIs

---

## 💻 Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/smart-campus-frontend.git
```

### Navigate to the Project

```bash
cd smart-campus-frontend
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

The application runs at:

```text
http://localhost:5173
```

---


## 🎯 Skills Demonstrated

* React.js Development
* Component-Based Architecture
* State Management using React Hooks
* REST API Integration
* Axios
* React Router
* Authentication & Authorization
* Protected Routing
* Responsive Web Design
* CRUD Operations
* Pagination
* Searching
* Multi-Parameter Filtering
* Sorting
* Error Handling
* Clean UI Development

---

## 🔗 Related Backend Repository

This frontend is designed to work with the **Smart Campus Helpdesk Backend**, built using **Spring Boot**, **Spring Security**, **Spring Data JPA**, **Redis**, **MySQL**, and **JWT Authentication**.

---

## 👩‍💻 Author

**Puredla Sridevi**

B.Tech – Computer Science Engineering
Andhra University

GitHub: https://github.com/Puredla-Sridevi

---


## 📄 License

This project is developed for educational purposes and demonstrates full-stack web development concepts using modern frontend technologies.
