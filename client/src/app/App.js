import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Navigation from '../features/navigation/navbar';
import LogIn from '../features/auth/login';
import HomePage from '../features/homepage/HomePage';
import SignUpForm from '../features/auth/signup';
import TourView from '../features/tour/tour-view';
import { getUserToursThunk } from '../features/homepage/HomePageSlice';
import { authUser } from '../features/auth/authSlice';

const App = () => {
  const token = useSelector((state) => state.auth.authenticated);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserToursThunk({ token }));
    dispatch(authUser());
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/tours/:tourId" element={<TourView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
