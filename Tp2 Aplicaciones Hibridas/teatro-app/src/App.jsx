// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import ObraDetail from './pages/ObraDetail';
import TeatroDetail from './pages/TeatroDetail';
import Login from './pages/LoginView';
import RegisterView from './pages/RegisterView';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterView />} />
          <Route 
            path="/" 
            element={
              <PrivateRoute>
                <Header />
                <Home />
                <Footer />
              </PrivateRoute>
            } 
          />
          <Route path="/profile" element={
            <PrivateRoute>
                <Header />
                <Profile />
                <Footer />
              </PrivateRoute>} />
        
        
        <Route path="/profile/:userId" element={<PrivateRoute>
                <Header />
                <Profile />
                <Footer />
              </PrivateRoute>} />
  
          <Route 
            path="/obra/:obraId" 
            element={
              <PrivateRoute>
                <Header />
                <ObraDetail />
                <Footer />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/teatro/:id" 
            element={
              <PrivateRoute>
                <Header />
                <TeatroDetail />
                <Footer />
              </PrivateRoute>
            } 
          />
        </Routes>
    </Router>
  );
};
export default App;
