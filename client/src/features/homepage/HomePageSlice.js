import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  events: []
}

export const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    signOut: () => {
      return initialState;
    }
  }

})

export default homePageSlice.reducer;