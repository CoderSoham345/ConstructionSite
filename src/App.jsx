import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './components/ui/Toast';
import Navbar from './components/layout/Navbar';

// Import all your pages here
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProjectList from './src/pages/ProjectList';
import Profile from './pages/Profile';
import DPRForm from './pages/DPRForm';

/**
 * Layout Component
 * Wraps all authenticated pages with the Navbar and checks for login status.
 */
const Layout = () => {
  const { user } = useAuth();
  const location = useLocation();

  // 1. If user is NOT logged in, kick them to Login
  if (!user) return <Navigate to="/login" replace />;

  // 2. If user IS logged in but tries to go to /login, send them to Dashboard
  if (user && location.pathname === '/login') return <Navigate to="/" replace />;

  return (
    <>
      {/* Top Navigation Bar */}
      <Navbar />
      
      {/* Main Content Area */}
      <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Routes>
          {/* HOME / DASHBOARD */}
          <Route path="/" element={<Dashboard />} />

          {/* PROJECT DIRECTORY */}
          <Route path="/projects" element={<ProjectList />} />

          {/* USER PROFILE / SETTINGS */}
          <Route path="/profile" element={<Profile />} />

          {/* DPR FORM (Dynamic ID) */}
          <Route path="/dpr/:id" element={<DPRForm />} />

          {/* CATCH-ALL: If route doesn't exist, go to Dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
};

/**
 * Main App Component
 * Wraps the whole app in Context Providers (Auth, Toast) and Router structure.
 */
function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          {/* PUBLIC ROUTE: Login page only */}
          <Route path="/login" element={<Login />} />
          
          {/* PRIVATE ROUTES: Everything else goes through the Layout wrapper */}
          <Route path="/*" element={<Layout />} />
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;