import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../components/layout/DashboardLayout";

// ==================== PUBLIC ====================

import LandingPage from "../pages/public/LandingPage";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";

// ==================== AUTH ====================

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import VerifyEmail from "../pages/auth/VerifyEmail";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyResetOtp from "../pages/auth/VerifyResetOtp";
import ResetPassword from "../pages/auth/ResetPassword";

// ==================== DASHBOARD ====================

import Dashboard from "../pages/dashboard/Dashboard";

// ==================== PATIENTS ====================

import PatientList from "../pages/patients/PatientList";
import AddPatient from "../pages/patients/AddPatient";
import EditPatient from "../pages/patients/EditPatient";
import PatientDetails from "../pages/patients/PatientDetails";

// ==================== DENTISTS ====================

import DentistList from "../pages/dentists/DentistList";
import AddDentist from "../pages/dentists/AddDentist";
import EditDentist from "../pages/dentists/EditDentist";
import DentistDetails from "../pages/dentists/DentisDetails";

// ==================== SCHEDULES ====================

import ScheduleList from "../pages/schedules/ScheduleList";
import AddSchedule from "../pages/schedules/AddSchedule";
import ScheduleDetails from "../pages/schedules/ScheduleDetails";
import EditSchedule from "../pages/schedules/EditSchedule";

// ==================== TREATMENTS ====================

import TreatmentList from "../pages/treatments/TreatmentList";
import AddTreatment from "../pages/treatments/AddTreatment";
import TreatmentDetails from "../pages/treatments/TreatmentDetails";
import EditTreatment from "../pages/treatments/EditTreatment";

// ==================== APPOINTMENTS ====================

import AppointmentList from "../pages/appointments/AppointmentList";
import AddAppointment from "../pages/appointments/AddAppointment";
import AppointmentDetails from "../pages/appointments/AppointmentDeatils";
import EditAppointment from "../pages/appointments/EditAppointment";
import RescheduleAppointment from "../pages/appointments/RescheduleAppointment";
import CancelAppointment from "../pages/appointments/CancelAppointment";

// ==================== BILLING ====================

import BillList from "../pages/billing/BillList";
import CreateBill from "../pages/billing/CreateBill";
import BillDetails from "../pages/billing/BillDeatils";
import EditBill from "../pages/billing/EditBill";
import PrintBill from "../pages/billing/PrintBill";

// ==================== REPORTS ====================

import Reports from "../pages/reports/Reports";

// ==================== STAFF ====================

import StaffProfile from "../pages/staff/StaffProfile";


function AppRoutes() {
  return (
    <Routes>

      {/* =====================================================
          PUBLIC ROUTES
      ===================================================== */}

      <Route
        path="/"
        element={<LandingPage />}
      />

      <Route
        path="/about"
        element={<About />}
      />

      <Route
        path="/contact"
        element={<Contact />}
      />


      {/* =====================================================
          AUTH ROUTES
      ===================================================== */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/verify-email"
        element={<VerifyEmail />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/verify-reset-otp"
        element={<VerifyResetOtp />}
      />

      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />


      {/* =====================================================
          PROTECTED ROUTES
      ===================================================== */}

      <Route element={<ProtectedRoute />}>

        {/* =================================================
            DASHBOARD LAYOUT
        ================================================= */}

        <Route element={<DashboardLayout />}>


          {/* =================================================
              DASHBOARD
          ================================================= */}

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />


          {/* =================================================
              PATIENTS
          ================================================= */}

          <Route
            path="/patients"
            element={<PatientList />}
          />

          <Route
            path="/patients/add"
            element={<AddPatient />}
          />

          <Route
            path="/patients/:id"
            element={<PatientDetails />}
          />

          <Route
            path="/patients/:id/edit"
            element={<EditPatient />}
          />


          {/* =================================================
              DENTISTS
          ================================================= */}

          <Route
            path="/dentists"
            element={<DentistList />}
          />

          <Route
            path="/dentists/add"
            element={<AddDentist />}
          />

          <Route
            path="/dentists/:id"
            element={<DentistDetails />}
          />

          <Route
            path="/dentists/:id/edit"
            element={<EditDentist />}
          />


          {/* =================================================
              SCHEDULES
          ================================================= */}

          <Route
            path="/schedules"
            element={<ScheduleList />}
          />

          <Route
            path="/schedules/add"
            element={<AddSchedule />}
          />

          <Route
            path="/schedules/:id"
            element={<ScheduleDetails />}
          />

          <Route
            path="/schedules/:id/edit"
            element={<EditSchedule />}
          />


          {/* =================================================
              TREATMENTS
          ================================================= */}

          <Route
            path="/treatments"
            element={<TreatmentList />}
          />

          <Route
            path="/treatments/add"
            element={<AddTreatment />}
          />

          <Route
            path="/treatments/:id"
            element={<TreatmentDetails />}
          />

          <Route
            path="/treatments/:id/edit"
            element={<EditTreatment />}
          />


          {/* =================================================
              APPOINTMENTS
          ================================================= */}

          <Route
            path="/appointments"
            element={<AppointmentList />}
          />

          <Route
            path="/appointments/add"
            element={<AddAppointment />}
          />

          <Route
            path="/appointments/:id"
            element={<AppointmentDetails />}
          />

          {/* ===== EDIT APPOINTMENT ===== */}

          <Route
            path="/appointments/:id/edit"
            element={<EditAppointment />}
          />

          {/* ===== RESCHEDULE APPOINTMENT ===== */}

          <Route
            path="/appointments/:id/reschedule"
            element={<RescheduleAppointment />}
          />

          {/* ===== CANCEL APPOINTMENT ===== */}

          <Route
            path="/appointments/:id/cancel"
            element={<CancelAppointment />}
          />


          {/* =================================================
              BILLING
          ================================================= */}

          <Route
            path="/billing"
            element={<BillList />}
          />

          <Route
            path="/billing/create"
            element={<CreateBill />}
          />

          <Route
            path="/billing/:id"
            element={<BillDetails />}
          />

          {/* ===== EDIT BILL ===== */}

          <Route
            path="/billing/:id/edit"
            element={<EditBill />}
          />

          {/* ===== PRINT BILL ===== */}

          <Route
            path="/billing/:id/print"
            element={<PrintBill />}
          />


          {/* =================================================
              REPORTS
          ================================================= */}

          <Route
            path="/reports"
            element={<Reports />}
          />


          {/* =================================================
              STAFF PROFILE
          ================================================= */}

          <Route
            path="/staff/profile"
            element={<StaffProfile />}
          />

        </Route>

      </Route>


      {/* =====================================================
          INVALID URL
      ===================================================== */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default AppRoutes;