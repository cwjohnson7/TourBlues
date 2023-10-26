import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseURL = 'http://localhost:8000';

const initialState = {
  events: [],
  venues: [],
};

export const getVenueQueryThunk = createAsyncThunk(
  'eventForm/getVenueQueryThunk',
  async ({ data, token }, thunkAPI) => {
    try {
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};
      const apiEndpoint = `/api/fetchVenues/${data.query}`;
      const response = await axios.get(baseURL + apiEndpoint, config);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);

export const getEventThunk = createAsyncThunk(
  'eventForm/getEventThunk',
  async ({ data, token }, thunkAPI) => {
    try {
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};
      const apiEndpoint = `/api/getEvent/${data.eventId}`;
      const response = await axios.get(baseURL + apiEndpoint, config);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);
// good
export const addEventThunk = createAsyncThunk(
  'eventForm/addEventThunk',
  async ({ data, token }, thunkAPI) => {
    try {
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};
      const apiEndpoint = '/api/addEvent';
      const response = await axios.post(baseURL + apiEndpoint, data, config);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);
// good
export const updateEventThunk = createAsyncThunk(
  'eventForm/updateEventThunk',
  async ({ data, token }, thunkAPI) => {
    try {
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};
      const apiEndpoint = '/api/updateEvent';
      const response = await axios.put(baseURL + apiEndpoint, data, config);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);

export const eventFormSlice = createSlice({
  name: 'eventForm',
  initialState,
  reducers: {
    closeEventForm: (state) => ({ ...state, venues: [], events: [] }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVenueQueryThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getVenueQueryThunk.fulfilled, (state, action) => {
        console.log('query results: ', action.payload);

        state.venues = action.payload.trimmedResults;
        state.status = 'fulfilled';
        state.error = null;
      })
      .addCase(getVenueQueryThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload.status;
      })
      .addCase(addEventThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addEventThunk.fulfilled, (state) => {
        state.status = 'fulfilled';
        state.error = null;
      })
      .addCase(addEventThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload.status;
      });
  },
});
export const { closeEventForm } = eventFormSlice.actions;
export default eventFormSlice.reducer;
