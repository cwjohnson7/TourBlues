import logo from '../logo.svg';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Navigation from '../features/navigation/navbar';
import LogIn from '../features/auth/login';
import HomePage from '../features/homepage/HomePage';
import SignUpForm from '../features/auth/signup';
import TourView from '../features/tour-view/tour-view';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path='/' element={<LogIn />} />
          <Route path='/signup' element={<SignUpForm />} />
          <Route path='/homepage' element={<HomePage />} />
          {/* /tours will be tours/:tourId once sample data is made */}
          <Route path='/tours' element={<TourView />} />
        </Routes>
      </BrowserRouter>    
    </div>
  );
}

export default App;
