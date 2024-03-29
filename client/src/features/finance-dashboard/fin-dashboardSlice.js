import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  finances: [],
};

export const finDashboardSlice = createSlice({
  name: 'eventForm',
  initialState,
  reducers: {
    findDashCase: () => initialState,
  },
});

export default finDashboardSlice.reducer;
