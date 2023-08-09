import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: []
}

export const eventFormSlice = createSlice({
  name: 'eventForm',
  initialState,
  reducers: {
    eventCase: () => {
      return initialState;
    }
  }

})

export default eventFormSlice.reducer;