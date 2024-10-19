import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import { AuthProvider, useAuth } from '../middleware/AuthContext';
import ProtectedRoute from '../middleware/ProtectedRoute';

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />

          <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
          <Route path="/register" element={<AuthRoute><Register /></AuthRoute>} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
