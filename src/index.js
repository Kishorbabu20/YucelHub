import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ServicesPage from "./ServicesPage";
import AboutPage from "./AboutPage";
import PartnerPage from "./PartnerPage";
import CareerPage from "./CareerPage";
import JobApplicationPage from "./JobApplicationPage";
import Portfolio from "./Portfolio";
import ProjectDetail from "./ProjectDetail";
import ContactPage from "./ContactPage";
import AdminPage from "./admin/AdminPage";
import "./styles/HomePage.css";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:serviceId" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/partner" element={<PartnerPage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/job-application" element={<JobApplicationPage />} />
        <Route path="/job-application/:jobId" element={<JobApplicationPage />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/project/:projectId" element={<ProjectDetail />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminPage />} />
        {/* Catch all route - redirect to home */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
