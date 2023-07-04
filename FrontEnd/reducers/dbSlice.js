import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BaseUrl = 'http://localhost:5000/herois';

function getToken() {
  if (localStorage.getItem('user')) {
    const storedData = JSON.parse(localStorage.getItem('user'));
    return storedData.token;
  }

  return null;
}

const myAxios = axios.create({
  baseURL: BaseUrl,
  headers: {
    Authorization: getToken(),
  },
});

export const getItemList = createAsyncThunk('list/getItemList', async () => {
  try {
    const resp = await axios.get(`${BaseUrl}/list`);
    return resp.data;
  } catch (error) {
    const { statusCode, message } = error.response.data;
    console.error(statusCode, message);
    throw { message: `${statusCode} - ${message}` };
  }
});

export const createItemList = createAsyncThunk(
  'list/createItemList',
  async (item) => {
    try {
      const resp = await myAxios.post(`${BaseUrl}/post`, item);
      console.log(resp.status, resp.statusText, resp.data);

      const list = await axios.get(`${BaseUrl}/list`);
      return list.data;
    } catch (error) {
      const { statusCode, message } = error.response.data;
      console.error(statusCode, message);
      throw { message: `${statusCode} - ${message}` };
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
      const resp = await myAxios.patch(
        `${BaseUrl}/update/${item.id}`,
        updatedItem
      );
      console.log(resp.status, resp.statusText, resp.data);

      const list = await axios.get(`${BaseUrl}/list`);
      return list.data;
    } catch (error) {
      const { statusCode, message } = error.response.data;
      console.error(statusCode, message);
      throw { message: `${statusCode} - ${message}` };
    }
  }
);

export const deleteItemList = createAsyncThunk(
  'list/deleteItemList',
  async (item) => {
    const id = item._id;
    try {
      const resp = await myAxios.delete(`${BaseUrl}/delete/${id}`);
      console.log(resp.status, resp.statusText, resp.data);

      const list = await axios.get(`${BaseUrl}/list`);
      return list.data;
    } catch (error) {
      const { statusCode, message } = error.response.data;
      console.error(statusCode, message);
      throw { message: `${statusCode} - ${message}` };
    }
  }
);

export const clearItemList = createAsyncThunk(
  'list/clearItemList',
  async () => {
    try {
      const resp = await myAxios.delete(`${BaseUrl}/deleteAll`);
      console.log(resp.status, resp.statusText, resp.data);

      const list = await axios.get(`${BaseUrl}/list`);
      return list.data;
    } catch (error) {
      const { statusCode, message } = error.response.data;
      console.error(statusCode, message);
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
