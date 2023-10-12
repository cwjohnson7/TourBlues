import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseURL = 'http://localhost:8000';

const initialState = {
  events: [],
  venues: [],
}

export const getVenueQueryThunk = createAsyncThunk('eventForm/getVenueQueryThunk', async (data,thunkAPI) => {
  try {
    // const config = token ? { headers: { 'Authorization': `Bearer ${token}` } } : {};
    const apiEndpoint = '/api/fetchVenues/' + data.query
    console.log('data param: ', data);
    const response = await axios.get(baseURL + apiEndpoint);
    console.log( 'axios response: ', response.data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
    })
  }
})

export const eventFormSlice = createSlice({
  name: 'eventForm',
  initialState,
  reducers: {
    eventCase: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getVenueQueryThunk.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(getVenueQueryThunk.fulfilled, (state, action) => {

      console.log("query results: ", action.payload);
      
      state.venues = action.payload.searchResults;
      state.status = 'fulfilled';
      state.error = null;
    })
    .addCase(getVenueQueryThunk.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload.status;
    })
  }
})

export default eventFormSlice.reducer;