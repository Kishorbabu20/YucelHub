import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./HomePage";
import ServicesPage from "./ServicesPage";
import AboutPage from "./AboutPage";
import PartnerPage from "./PartnerPage";
import CareerPage from "./CareerPage";
import Portfolio from "./Portfolio";
import ProjectDetail from "./ProjectDetail";
import ContactPage from "./ContactPage";
import AdminPage from "./admin/AdminPage";
import "./styles/HomePage.css";

function AppRouter() {
  const [route, setRoute] = useState(window.location.hash || "#/home");

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || "#/home");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (route === "#/services") {
    return <ServicesPage />;
  }
  if (route === "#/about") {
    return <AboutPage />;
  }
  if (route === "#/partner") {
    return <PartnerPage />;
  }
  if (route === "#/career") {
    return <CareerPage />;
  }
  if (route === "#/portfolio") {
    return <Portfolio />;
  }
  if (route.startsWith("#/project")) {
    return <ProjectDetail />;
  }
  if (route === "#/contact") {
    return <ContactPage />;
  }
  if (route === "#/admin") {
    return <AdminPage />;
  }
  return <HomePage />;
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
