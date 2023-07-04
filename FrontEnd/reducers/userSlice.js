import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BaseUrl = 'http://localhost:5000';

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  user: {},
};

export const loginUser = createAsyncThunk('login/loginUser', async (user) => {
  try {
    const resp = await axios.post(`${BaseUrl}/login`, user);
    const { username, password } = user;
    const loggedUser = { username, password, token: resp.data.token };

    return loggedUser;
  } catch (err) {
    const { statusCode, message } = err.response.data;
    console.error(statusCode, message);
    throw { message: `${statusCode} - ${message}` };
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.user = {};
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        console.error('loginUser rejected! - ', action.error.message);
      });
  },
});

export const { logIn, logOut } = userSlice.actions;
export default userSlice.reducer;
