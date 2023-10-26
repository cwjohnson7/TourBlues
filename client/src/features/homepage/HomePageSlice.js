import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addEventThunk, updateEventThunk } from '../event/event-formSlice';

// const baseURL = 'http://localhost:8000';
const baseURL = process.env.REACT_APP_BASE_URL;

const initialState = {
  tours: [],
};
// good
export const getUserToursThunk = createAsyncThunk(
  'homePage/getUserToursThunk',
  async ({ token }, thunkAPI) => {
    try {
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};
      const apiEndpoint = `/api/getUserTours`;
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
// not used
export const getEventsThunk = createAsyncThunk(
  'homePage/getEventsThunk',
  async ({ data, token }, thunkAPI) => {
    try {
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};
      const apiEndpoint = `/api/getEvents/${data.tourId}`;
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
export const deleteEventThunk = createAsyncThunk(
  'homePage/deleteEventThunk',
  async ({ data, token }, thunkAPI) => {
    try {
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};
      const apiEndpoint = '/api/removeEvent';
      const response = await axios.delete(baseURL + apiEndpoint, {
        ...config,
        data,
      });
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
export const addTourThunk = createAsyncThunk(
  'homePage/addTourThunk',
  async ({ data, token }, thunkAPI) => {
    try {
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};
      const apiEndpoint = '/api/addTour';
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
export const updateTourThunk = createAsyncThunk(
  'homePage/updateTourThunk',
  async ({ data, token }, thunkAPI) => {
    try {
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};
      const apiEndpoint = '/api/updateTour';
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
// good
export const deleteTourThunk = createAsyncThunk(
  'homePage/deleteTourThunk',
  async ({ data, token }, thunkAPI) => {
    try {
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};
      const apiEndpoint = '/api/removeTour';
      const response = await axios.delete(baseURL + apiEndpoint, {
        ...config,
        data,
      });
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
export const addLineupArtistThunk = createAsyncThunk(
  'homePage/addLineupArtistThunk',
  async ({ data, token }, thunkAPI) => {
    try {
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};
      const apiEndpoint = '/api/addLineupArtist';
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
export const updateLineupArtistThunk = createAsyncThunk(
  'homePage/updateLineupArtistThunk',
  async ({ data, token }, thunkAPI) => {
    try {
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};
      const apiEndpoint = '/api/updateArtist';
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
// good
export const deleteLineupArtistThunk = createAsyncThunk(
  'homePage/deleteArtistLineupThunk',
  async ({ data, token }, thunkAPI) => {
    try {
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};
      const apiEndpoint = '/api/removeLineupArtist';
      const response = await axios.delete(baseURL + apiEndpoint, {
        ...config,
        data,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);

export const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    signOut: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserToursThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getUserToursThunk.fulfilled, (state, action) => {
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
          events: [],
        });
        state.status = 'fulfilled';
        state.error = null;
      })
      .addCase(addTourThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })
      .addCase(updateTourThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateTourThunk.fulfilled, (state, action) => {
        const { updatedTour } = action.payload;
        const tour = state.tours.find(
          (element) => element._id === updatedTour._id
        );
        tour.name = updatedTour.name;
        state.status = 'fulfilled';
        state.error = null;
      })
      .addCase(updateTourThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })
      .addCase(deleteTourThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteTourThunk.fulfilled, (state, action) => {
        const { removedTour } = action.payload;
        const tour = state.tours.find(
          (element) => element._id === removedTour._id
        );
        const tourIndex = state.tours.indexOf(tour);
        state.tours.splice(tourIndex, 1);
        state.status = 'fulfilled';
        state.error = null;
      })
      .addCase(deleteTourThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })
      .addCase(addEventThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addEventThunk.fulfilled, (state, action) => {
        const { event, lineup, venue, existingVenue, artistId } =
          action.payload;
        const tour = state.tours.find((element) => element._id === event.tour);

        tour.events.push({
          _id: event._id,
          artist: artistId,
          tour: event.tour,
          venue: existingVenue || venue,
          lineup,
          date: event.date,
          doors: event.doors,
          setLenght: event.setLength,
        });

        state.status = 'fulfilled';
        state.error = null;
      })
      .addCase(addEventThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload.status;
      })
      .addCase(addLineupArtistThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addLineupArtistThunk.fulfilled, (state, action) => {
        const { lineupArtist, existingArtist, tourId, eventId } =
          action.payload;
        // find specific tour the event is added to
        const tour = state.tours.find((element) => element._id === tourId);
        // find which event's lineup is being added to
        const event = tour.events.find((element) => element._id === eventId);

        if (existingArtist) {
          console.log('existingArtist from payload: ', existingArtist);
        }
        if (lineupArtist) {
          console.log('lineupArtist from payload: ', lineupArtist);
        }

        event.lineup.push(existingArtist || lineupArtist);
        state.events = action.payload;
        state.status = 'fulfilled';
        state.error = null;
      })
      .addCase(addLineupArtistThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload.status;
      })
      .addCase(deleteLineupArtistThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteLineupArtistThunk.fulfilled, (state, action) => {
        const { removedLineupArtist, tourId, eventId } = action.payload;
        const tour = state.tours.find((element) => element._id === tourId);
        const event = tour.events.find((element) => element._id === eventId);
        const removedArtist = event.lineup.find(
          (element) => element._id === removedLineupArtist._id
        );
        const artistIndex = event.lineup.indexOf(removedArtist);
        event.lineup.splice(artistIndex, 1);
        state.status = 'fulfilled';
        state.error = null;
      })
      .addCase(updateEventThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateEventThunk.fulfilled, (state, action) => {
        const { eventId, updatedEvent, updatedVenue } = action.payload;

        // find which tour has the event being updated
        const tour = state.tours.find(
          (element) => element._id === updatedEvent.tour
        );
        // find which event is being updated
        const event = tour.events.find((element) => element._id === eventId);
        event.venue = updatedVenue;
        event.date = updatedEvent.date;
        event.doors = updatedEvent.doors;
        event.setLength = updatedEvent.setLength;
        state.status = 'fulfilled';
        state.error = null;
      })
      .addCase(updateEventThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload.status;
      })
      .addCase(updateLineupArtistThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateLineupArtistThunk.fulfilled, (state, action) => {
        const { eventId, tourId, updatedArtist } = action.payload;
        // find which tour has the event being updated
        const tour = state.tours.find((element) => element._id === tourId);
        // find which event is being updated
        const event = tour.events.find((element) => element._id === eventId);
        // find which artist in event.lineup is being updated
        const artist = event.lineup.find(
          (element) => element._id === updatedArtist._id
        );
        artist.name = updatedArtist.name;
        artist.contact = updatedArtist.contact;
        artist.email = updatedArtist.email;
        artist.handle = updatedArtist.handle;
        artist.phone = updatedArtist.phone;
        state.status = 'fulfilled';
        state.error = null;
      })
      .addCase(updateLineupArtistThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload.status;
      })
      .addCase(deleteEventThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteEventThunk.fulfilled, (state, action) => {
        const { eventId, tourRef } = action.payload;
        // find which tour has the event being removed
        const tour = state.tours.find((element) => element._id === tourRef._id);
        const eventIdArr = tour.events.map((element) => element._id);
        const indexOfEvent = eventIdArr.indexOf(eventId);
        tour.events.splice(indexOfEvent, 1);
        state.status = 'fulfilled';
        state.error = null;
      })
      .addCase(deleteEventThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload.status;
      });
  },
});

export default homePageSlice.reducer;
