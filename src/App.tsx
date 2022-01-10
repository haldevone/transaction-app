import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from '../src/pages/home/Home'
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Navbar from './components/Navbar';
import { useAuthContext } from './hooks/useAuthContext';
import { Navigate } from 'react-router-dom';
import PieChart from './pages/home/PieChart';

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" 
          element={user ? <Home /> : <Navigate to="/login"/>}/>
          <Route path="/chart" 
          element={user ? <PieChart /> : <Navigate to="/chart"/>}/>
          <Route path="/login" 
          element={!user ? <Login /> : <Navigate to="/"/>}/>
          <Route path="/signup" 
          element={!user ? <Signup/> : <Navigate to="/"/>}/>
          
        </Routes>
      </Router>
      )}
    </div>
  );
}

export default App;
