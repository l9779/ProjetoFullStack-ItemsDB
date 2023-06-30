import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAnyOpen: false,
  isDeleteOpen: false,
  isEditOpen: false,
  isAddOpen: false,
  isDeleteAllOpen: false,
  item: {},
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openDeleteModal: (state, action) => {
      if (state.isAnyOpen) return;

      state.item = action.payload;
      state.isDeleteOpen = true;
    },
    closeDeleteModal: (state) => {
      state.item = {};
      state.isDeleteOpen = false;
      state.isAnyOpen = false;
    },
    openEditModal: (state, action) => {
      if (state.isAnyOpen) return;

      state.item = action.payload;
      state.isEditOpen = true;
    },
    closeEditModal: (state) => {
      state.item = {};
      state.isEditOpen = false;
      state.isAnyOpen = false;
    },
    openAddModal: (state) => {
      if (state.isAnyOpen) return;

      state.isAddOpen = true;
    },
    closeAddModal: (state) => {
      state.isAddOpen = false;
      state.isAnyOpen = false;
    },
    openDeleteAllModal: (state) => {
      if (state.isAnyOpen) return;

      state.isDeleteAllOpen = true;
    },
    closeDeleteAllModal: (state) => {
      state.isDeleteAllOpen = false;
      state.isAnyOpen = false;
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
  openDeleteAllModal,
  closeDeleteAllModal,
} = modalSlice.actions;
export default modalSlice.reducer;
