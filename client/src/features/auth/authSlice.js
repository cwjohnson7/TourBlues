import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";
const base_URL = "http://localhost:3000"

const initialState = {
  //use localStorage.getItem("token") || "" for authenticated property once auth is setup
  authenticated: "",
  email: null,
  firstName: null,
  lastName: null
}

// export const signIn = createAsyncThunk(
//   'auth/signIn',
//   async (data, callback) => {
//     try {
//       // const response = await axios.post(base_URL + '/api/signIn', data)
//       const response = "authenticated";
//       callback();
//       return response;
//     } catch (err) {
//       throw err;
//     }
//   }
// )

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut(state){
      return {...state,
        authenticated: "",
        email: null,
        firstName: null,
        lastName: null
      }
    },
    signIn(state, action){
      const { authenticated } = action.payload;
     return  {...state,
      authenticated: authenticated,
      email: 'cliff@gmail.com',
      firstName: 'Cliff',
      lastName: 'Jameson'
    }
    }
  },
  // extraReducers: (builder) => {
  //   builder
  //   .addCase(signIn.pending, (state) => {
  //     state.status = 'Loading'
  //     state.error = null
  //   })
  //   .addCase(signIn.fulfilled, (state, action) => {
  //     state.status = 'Fulfilled'
  //     state.error = null
  //     state.authenticated = action.payload.data
  //   })
  //   .addCase(signIn.rejected, (state, action) => {
  //     state.status = 'Rejected'
  //     state.error = action.error.message
  //   })
  // }
})
export const { signOut, signIn } = authSlice.actions
export default authSlice.reducer;