import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard';

// Protected Route wrapper
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <Routes>
        {/* public Routes */}
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>

       {/* protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        }
        />

        {/* default login */}
        <Route path="*" element={<Navigate to="/login"/>}/>
      </Routes>
    </>
  )
}

export default App
