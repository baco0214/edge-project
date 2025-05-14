import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetails from './pages/ProjectDetails';
import FinancialReports from './pages/FinancialReports';
import DocumentsPage from './pages/DocumentsPage';
import InvestorArea from './pages/InvestorArea';
import Contact from './pages/Contact';
import Login from './pages/Login';
import './index.css';

function App() {
  // For demo purposes, we'll consider the user as authenticated
  const isAuthenticated = true;

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-neutral-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={
              isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
            } />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={
              isAuthenticated ? <ProjectDetails /> : <Navigate to="/login" replace />
            } />
            <Route path="/financial-reports" element={
              isAuthenticated ? <FinancialReports /> : <Navigate to="/login" replace />
            } />
            <Route path="/documents" element={
              isAuthenticated ? <DocumentsPage /> : <Navigate to="/login" replace />
            } />
            <Route path="/investor-area" element={
              isAuthenticated ? <InvestorArea /> : <Navigate to="/login" replace />
            } />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;