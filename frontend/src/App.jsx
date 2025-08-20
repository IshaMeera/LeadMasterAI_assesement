import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';

const Dashboard = () => {
  return <h2>Welcome to the Dashboard</h2>;
};

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
