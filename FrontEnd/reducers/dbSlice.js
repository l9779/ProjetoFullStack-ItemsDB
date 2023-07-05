import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BaseUrl = 'http://localhost:5000/herois';

export const getItemList = createAsyncThunk('list/getItemList', async () => {
  try {
    const resp = await axios.get(`${BaseUrl}/list`);
    return resp.data;
  } catch (error) {
    const { statusCode, message } = error.response.data;
    throw { message: `${statusCode} - ${message}` };
  }
});

export const createItemList = createAsyncThunk(
  'list/createItemList',
  async (payload) => {
    const itemToAdd = { nome: payload.nome, poder: payload.poder };

    try {
      const resp = await axios.post(`${BaseUrl}/post`, itemToAdd, {
        headers: {
          Authorization: payload.token,
        },
      });
      console.log(resp.status, resp.statusText, resp.data);

      const list = await axios.get(`${BaseUrl}/list`);
      return list.data;
    } catch (error) {
      const { statusCode, message } = error.response.data;
      throw { message: `${statusCode} - ${message}` };
    }
  }
);

export const editItemList = createAsyncThunk(
  'list/editItemList',
  async (payload) => {
    const updatedItem = {
      nome: payload.updatedItem.nome,
      poder: payload.updatedItem.poder,
    };

    try {
      const resp = await axios.patch(
        `${BaseUrl}/update/${payload.updatedItem.id}`,
        updatedItem,
        {
          headers: {
            Authorization: payload.token,
          },
        }
      );
      console.log(resp.status, resp.statusText, resp.data);

      const list = await axios.get(`${BaseUrl}/list`);
      return list.data;
    } catch (error) {
      const { statusCode, message } = error.response.data;
      throw { message: `${statusCode} - ${message}` };
    }
  }
);

export const deleteItemList = createAsyncThunk(
  'list/deleteItemList',
  async (payload) => {
    try {
      const resp = await axios.delete(`${BaseUrl}/delete/${payload.id}`, {
        headers: {
          Authorization: payload.token,
        },
      });
      console.log(resp.status, resp.statusText, resp.data);

      const list = await axios.get(`${BaseUrl}/list`);
      return list.data;
    } catch (error) {
      const { statusCode, message } = error.response.data;
      throw { message: `${statusCode} - ${message}` };
    }
  }
);

export const clearItemList = createAsyncThunk(
  'list/clearItemList',
  async (token) => {
    try {
      const resp = await axios.delete(`${BaseUrl}/deleteAll`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(resp.status, resp.statusText, resp.data);

      const list = await axios.get(`${BaseUrl}/list`);
      return list.data;
    } catch (error) {
      const { statusCode, message } = error.response.data;
      throw { message: `${statusCode} - ${message}` };
    }
  }
);

const initialState = {
  itemsList: [],
  isLoading: false,
  errorMessage: '',
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
        state.errorMessage = '';
        state.itemsList = action.payload;
      })
      .addCase(getItemList.rejected, (state, action) => {
        console.log('getItemList rejected! - ', action);
        state.isLoading = false;
        state.errorMessage = action.error.message;
      })
      .addCase(createItemList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createItemList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = '';
        state.itemsList = action.payload;
      })
      .addCase(createItemList.rejected, (state, action) => {
        console.error('createItemList rejected! - ', action);
        state.isLoading = false;
        state.errorMessage = action.error.message;
      })
      .addCase(editItemList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editItemList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = '';
        state.itemsList = action.payload;
      })
      .addCase(editItemList.rejected, (state, action) => {
        console.error('editItemList rejected! - ', action);
        state.isLoading = false;
        state.errorMessage = action.error.message;
      })
      .addCase(deleteItemList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteItemList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = '';
        state.itemsList = action.payload;
      })
      .addCase(deleteItemList.rejected, (state, action) => {
        console.error('editItemList rejected! - ', action);
        state.isLoading = false;
        state.errorMessage = action.error.message;
      })
      .addCase(clearItemList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clearItemList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = '';
        state.itemsList = action.payload;
      })
      .addCase(clearItemList.rejected, (state, action) => {
        console.error('clearItemList rejected! - ', action);
        state.isLoading = false;
        state.errorMessage = action.error.message;
      });
  },
});

// export const {  } = dbSlice.actions;
export default dbSlice.reducer;
