import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BaseUrl = 'http://localhost:5000';

const initialState = {
  isLoading: false,
  isLoggedin: false,
  user: {},
};

export const loginUser = createAsyncThunk('login/loginUser', async (user) => {
  try {
    const resp = await axios.post(`${BaseUrl}/login`, user);
    const { username, password } = user;
    const loggedUser = { username, password, token: resp.data.token };

    return loggedUser;
  } catch (error) {
    console.error('loginUser error: ', error);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = {};
      state.isLoggedin = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedin = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        console.log('loginUser rejected! - ', action);
      });
  },
});

export const { logOut, isLoggedin } = userSlice.actions;
export default userSlice.reducer;
