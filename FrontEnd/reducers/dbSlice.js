import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BaseUrl = 'http://localhost:5000/herois';

// import itemsList from './../src/data';

// const user = {
//   username: 'Joaozinho',
//   password: '123',
//   token:
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvYW96aW5obyIsImlkIjoyLCJpYXQiOjE2ODcyNzM5MTl9.s6dLvHAY4tZm3fzS4U8Kd6-WUCWm4i7RbRhGKW1Ur_c',
// };

export const getItemList = createAsyncThunk('list/getItemList', async () => {
  try {
    const resp = await axios.get(`${BaseUrl}/list`);
    return resp.data;
  } catch (error) {
    console.error('getItemList error: ', error);
  }
});

export const createItemList = createAsyncThunk(
  'list/createItemList',
  async (item) => {
    try {
      const resp = await axios.post(`${BaseUrl}/post`, item);
      console.log(resp.status, resp.statusText, resp.data);

      const list = await axios.get(`${BaseUrl}/list`);
      return list.data;
    } catch (error) {
      console.error('createItemList error: ', error);
    }
  }
);

export const editItemList = createAsyncThunk(
  'list/editItemList',
  async (item) => {
    const updatedItem = {
      nome: item.nome,
      poder: item.poder,
    };

    try {
      const resp = await axios.patch(
        `${BaseUrl}/update/${item.id}`,
        updatedItem
      );
      console.log(resp.status, resp.statusText, resp.data);

      const list = await axios.get(`${BaseUrl}/list`);
      return list.data;
    } catch (error) {
      console.error('editItemList error: ', error);
    }
  }
);

export const deleteItemList = createAsyncThunk(
  'list/deleteItemList',
  async (item) => {
    const id = item._id;
    try {
      const resp = await axios.delete(`${BaseUrl}/delete/${id}`);
      console.log(resp.status, resp.statusText, resp.data);

      const list = await axios.get(`${BaseUrl}/list`);
      return list.data;
    } catch (error) {
      console.error('deleteItemList error: ', error);
    }
  }
);

export const clearItemList = createAsyncThunk(
  'list/clearItemList',
  async () => {
    try {
      const resp = await axios.delete(`${BaseUrl}/deleteAll`);
      console.log(resp.status, resp.statusText, resp.data);

      const list = await axios.get(`${BaseUrl}/list`);
      return list.data;
    } catch (error) {
      console.error('clearItemList error: ', error);
    }
  }
);

const initialState = {
  itemsList: [],
  isLoading: false,
};

const dbSlice = createSlice({
  name: 'db',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getItemList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItemList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.itemsList = action.payload;
      })
      .addCase(getItemList.rejected, (state, action) => {
        console.log('getItemList rejected! - ', action);
        state.isLoading = false;
      })
      .addCase(createItemList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createItemList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.itemsList = action.payload;
      })
      .addCase(createItemList.rejected, (state, action) => {
        console.error('createItemList rejected! - ', action);
        state.isLoading = false;
      })
      .addCase(editItemList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editItemList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.itemsList = action.payload;
      })
      .addCase(editItemList.rejected, (state, action) => {
        console.error('editItemList rejected! - ', action);
        state.isLoading = false;
      })
      .addCase(deleteItemList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteItemList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.itemsList = action.payload;
      })
      .addCase(deleteItemList.rejected, (state, action) => {
        console.error('editItemList rejected! - ', action);
        state.isLoading = false;
      })
      .addCase(clearItemList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clearItemList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.itemsList = action.payload;
      })
      .addCase(clearItemList.rejected, (state, action) => {
        console.error('clearItemList rejected! - ', action);
        state.isLoading = false;
      });
  },
});

// export const {  } = dbSlice.actions;
export default dbSlice.reducer;
