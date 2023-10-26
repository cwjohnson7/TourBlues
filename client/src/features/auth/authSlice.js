import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'http://localhost:8000';

const initialState = {
  authenticated: localStorage.getItem('token') || '',
  email: null,
  firstName: null,
  lastName: null,
};

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ data, callback }, thunkAPI) => {
    try {
      const apiEndpoint = '/api/signUp';

      const response = await axios.post(baseUrl + apiEndpoint, data);
      localStorage.setItem('token', response.data.token);
      callback();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ data, callback }, thunkAPI) => {
    try {
      const apiEndpoint = '/api/signIn';

      const response = await axios.post(baseUrl + apiEndpoint, data);
      callback();
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);

export const authUser = createAsyncThunk('auth/authUser', async (thunkAPI) => {
  try {
    const apiEndpoint = '/api/currentUser';
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const response = await axios.get(baseUrl + apiEndpoint, config);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
    });
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut(state) {
      return {
        ...state,
        authenticated: '',
        email: null,
        firstName: null,
        lastName: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = 'Loading';
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        return {
          ...state,
          authenticated: token,
          email: user.email,
          firstname: user.firstName,
          artistId: user.artistId,
          artistName: user.artistName,
          status: 'Fulfilled',
          error: null,
        };
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = 'Rejected';
        state.error = action.payload;
      })
      .addCase(signIn.pending, (state) => {
        state.status = 'Loading';
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        return {
          ...state,
          authenticated: token,
          email: user.email,
          firstname: user.firstName,
          artistId: user.artistId,
          artistName: user.artistName,
          status: 'Fulfilled',
          error: null,
        };
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'Rejected';
        state.error = action.error.message;
      })
      .addCase(authUser.pending, (state) => {
        state.status = 'Loading';
        state.error = null;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        return {
          ...state,
          authenticated: token,
          email: user.email,
          firstname: user.firstName,
          artistId: user.artistId,
          artistName: user.artistName,
          status: 'Fulfilled',
          error: null,
        };
      })
      .addCase(authUser.rejected, (state, action) => {
        state.status = 'Rejected';
        state.error = action.error.message;
      });
  },
});
export const { signOut } = authSlice.actions;
export default authSlice.reducer;
