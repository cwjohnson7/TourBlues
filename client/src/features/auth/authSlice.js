import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: []
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authCase: () => {
      return initialState;
    }
  }

})

export default authSlice.reducer;