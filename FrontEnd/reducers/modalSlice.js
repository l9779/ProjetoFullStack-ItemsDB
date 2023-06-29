import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDeleteOpen: false,
  isEditOpen: false,
  isAddOpen: false,
  item: {},
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openDeleteModal: (state, action) => {
      state.item = action.payload;
      state.isEditOpen = false;
      state.isDeleteOpen = true;
    },
    closeDeleteModal: (state) => {
      state.item = {};
      state.isDeleteOpen = false;
    },
    openEditModal: (state, action) => {
      state.item = action.payload;
      state.isDeleteOpen = false;
      state.isEditOpen = true;
    },
    closeEditModal: (state) => {
      state.item = {};
      state.isEditOpen = false;
    },
    openAddModal: (state) => {
      state.isAddOpen = true;
    },
    closeAddModal: (state) => {
      state.item = {};
      state.isAddOpen = false;
    },
  },
});

export const {
  openDeleteModal,
  closeDeleteModal,
  openEditModal,
  closeEditModal,
  openAddModal,
  closeAddModal,
} = modalSlice.actions;
export default modalSlice.reducer;
