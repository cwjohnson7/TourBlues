import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import EventFormReducer from '../features/event/event-formSlice';
import HomePageReducer from '../features/homepage/HomePageSlice';
import FinDashboardReducer from '../features/finance-dashboard/fin-dashboardSlice';
import AuthReducer from '../features/auth/authSlice';

const rootReducer = combineReducers({
  homePage: HomePageReducer,
  eventForm: EventFormReducer,
  finDashboard: FinDashboardReducer,
  auth: AuthReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
