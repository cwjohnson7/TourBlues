import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseURL = 'http://localhost:8000';

const initialState = {
  tours: []
}

export const getUserToursThunk = createAsyncThunk('homePage/getUserToursThunk', async (data,thunkAPI) => {
    try {
      // const config = token ? { headers: { 'Authorization': `Bearer ${token}` } } : {};
      const apiEndpoint = '/api/getUserTours/' + data.artistId
      console.log('data param: ', data);
      const response = await axios.get(baseURL + apiEndpoint);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      })
    }
  }
)

export const getEventsThunk = createAsyncThunk('homePage/getEventsThunk', async (data,thunkAPI) => {
    try {
      // const config = token ? { headers: { 'Authorization': `Bearer ${token}` } } : {};
      const apiEndpoint = '/api/getEvents/' + data.tourId
      console.log('data param: ', data);
      const response = await axios.get(baseURL + apiEndpoint);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      })
    }
  }
)

export const addTourThunk = createAsyncThunk('homePage/addTourThunk', async ({data}, thunkAPI) => {
    try{
      const apiEndpoint = '/api/addTour';
      const response = await axios.post(baseURL + apiEndpoint, data);
      console.log('response.data ', response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      })
    }
  }
)

export const addEventThunk = createAsyncThunk('homePage/addEventThunk', async (data, thunkAPI) => {
    try{
      const apiEndpoint = '/api/addEvent';
      const response = await axios.post(baseURL + apiEndpoint, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      })
    }
  }
)

export const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    signOut: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getUserToursThunk.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(getUserToursThunk.fulfilled, (state, action) => {
      // console.log('action.payload.tours ', action.payload.tours);
      state.tours = action.payload.tours;
      state.status = 'fulfilled';
      state.error = null;
    })
    .addCase(getUserToursThunk.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    })
    .addCase(addTourThunk.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(addTourThunk.fulfilled, (state, action) => {
      state.tours.push({
        _id: action.payload.tour._id,
        artist: action.payload.tour.artist,
        name: action.payload.tour.name,
        events: []
      })
      // console.log('action.payload.tour: ', action.payload.tour)
      state.status = 'fulfilled';
      state.error = null;
    })
    .addCase(addTourThunk.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    })
    // .addCase(getEventsThunk.pending, (state) => {
    //   state.status = 'lodaing';
    //   state.error = null;
    // })
    // .addCase(getEventsThunk.fulfilled, (state, action) => {
    //   console.log('action.payload.tours ', action.payload.tours);
    //   state.tours = action.payload.tours;
    //   state.status = 'fulfilled';
    //   state.error = null;
    // })
  }
})

export default homePageSlice.reducer;