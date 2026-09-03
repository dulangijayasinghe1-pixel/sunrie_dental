# 🦷 Sunrise Dental Clinic Management System

<!-- <p align="center">
  <img src="public/thooth.png" alt="Sunrise Dental Logo" width="120"/>
</p> -->

<h3 align="center">A Modern Dental Clinic Management System</h3>

<p align="center">
  A web-based system designed to simplify and manage the daily operations of a dental clinic.
</p>

---

## 📌 About the Project

**Sunrise Dental Clinic Management System** is a full-stack web application developed to manage the daily activities of a dental clinic efficiently.

The system provides a centralized platform for staff to manage:

- Patients
- Dentists
- Dentist schedules
- Appointments
- Treatments
- Billing
- Reports
- Staff profiles

It also provides secure staff authentication with email verification and password recovery.

---

## ✨ Main Features

### 🔐 Authentication & Security
- Staff registration
- Email OTP verification
- Secure staff login
- JWT-based authentication
- Forgot password
- Reset password with OTP verification
- Account activation/deactivation

### 👥 Patient Management
- Add new patients
- View patient details
- Update patient information
- Delete patient records
- Search patients
- Guardian information for minor patients

### 👨‍⚕️ Dentist Management
- Add dentists
- View dentist details
- Update dentist information
- Delete dentists
- Dentist specialization management
- Active/inactive dentist status

### 🗓️ Dentist Schedule Management
- Create dentist schedules
- Update schedules
- View schedules
- Delete schedules
- Manage dentist availability
- Day and time-based scheduling

### 📅 Appointment Management
- Create appointments
- View appointments
- Search appointments
- Reschedule appointments
- Cancel appointments
- Complete appointments
- View upcoming appointments
- Patient and dentist appointment filtering
- Appointment conflict checking

### 🦷 Treatment Management
- Create treatments
- Update treatments
- View treatments
- Delete treatments
- Assign treatments to patients and dentists
- Treatment status management
- Treatment cost management

### 💳 Billing Management
- Create bills
- View bills
- Update bills
- Mark bills as paid
- Cancel bills
- Calculate discounts and total amounts
- Patient-based billing
- Appointment-based billing
- Revenue tracking
- Pending amount tracking
- Printable PDF bills

### 📊 Dashboard & Reports
- Patient statistics
- Dentist statistics
- Appointment statistics
- Treatment statistics
- Revenue summary
- Pending payment summary
- Management reports

### 📧 Email Notifications
The system supports email notifications for important clinic activities such as:

- Account verification
- Password recovery
- Patient registration
- Dentist registration
- Appointment confirmation
- Appointment updates
- Billing notifications

---

## 🛠️ Technologies Used

### Frontend

- React.js
- Vite
- Tailwind CSS
- DaisyUI
- Axios
- React Router
- Zustand
- React Icons
- React Toastify

### Backend

- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT
- Maven

### Database

- MySQL 8

### Other Technologies

- REST API
- Email OTP
- PDF Generation
- Git & GitHub

---

## 🏗️ System Architecture

The system follows a layered architecture consisting of:

```text
                    ┌─────────────────────────┐
                    │      React Frontend     │
                    │   Vite + Tailwind CSS   │
                    └────────────┬────────────┘
                                 │
                                 │ REST API
                                 ▼
                    ┌─────────────────────────┐
                    │    Spring Boot Backend  │
                    │     REST Controllers    │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │      Service Layer      │
                    │   Business Logic        │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │    Repository Layer     │
                    │    Spring Data JPA      │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │       MySQL Database    │
                    └─────────────────────────┘

## 📸 Screenshots

### 🏠 Landing Page

![Landing Page](https://github.com/user-attachments/assets/1464c480-27c4-48b0-b2a7-f682b8209235)

### ℹ️ About Page

![About Page](https://github.com/user-attachments/assets/4ffbb292-8cf8-4315-ade2-459f933fae91)

### 🔐 Login Page

![Login Page](https://github.com/user-attachments/assets/fe6bc886-e098-481d-a836-a397363319f2)

### 💳 Bills

![Bills](https://github.com/user-attachments/assets/5cff4d4e-5510-4611-ba48-bc5bfa235fb9)

### 👤 Staff

![Staff](https://github.com/user-attachments/assets/7e4d8c17-c902-479d-b79a-f347da483168)

### 🗄️ Database

![Database](https://github.com/user-attachments/assets/a32553e1-bf5f-44a0-b787-2c60fe16338e)














