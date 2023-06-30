import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAnyOpen: false,
  isDeleteOpen: false,
  isEditOpen: false,
  isAddOpen: false,
  isDeleteAllOpen: false,
  isLoginInNotifyOpen: false,
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
      state.isAnyOpen = true;
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
      state.isAnyOpen = true;
    },
    closeEditModal: (state) => {
      state.item = {};
      state.isEditOpen = false;
      state.isAnyOpen = false;
    },
    openAddModal: (state) => {
      if (state.isAnyOpen) return;

      state.isAddOpen = true;
      state.isAnyOpen = true;
    },
    closeAddModal: (state) => {
      state.isAddOpen = false;
      state.isAnyOpen = false;
    },
    openDeleteAllModal: (state) => {
      if (state.isAnyOpen) return;

      state.isDeleteAllOpen = true;
      state.isAnyOpen = true;
    },
    closeDeleteAllModal: (state) => {
      state.isDeleteAllOpen = false;
      state.isAnyOpen = false;
    },
    openLoginInNotifyModal: (state) => {
      state.isLoginInNotifyOpen = true;
      state.isAnyOpen = true;
    },
    closeLoginInNotifyModal: (state) => {
      state.isLoginInNotifyOpen = false;
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
  openLoginInNotifyModal,
  closeLoginInNotifyModal,
} = modalSlice.actions;
export default modalSlice.reducer;
