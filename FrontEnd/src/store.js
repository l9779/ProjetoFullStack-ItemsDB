import { configureStore } from '@reduxjs/toolkit';

import dbReducer from './../reducers/dbSlice';
import modalReducer from './../reducers/modalSlice';
import userReducer from './../reducers/userSlice';

export const store = configureStore({
  reducer: {
    db: dbReducer,
    modal: modalReducer,
    user: userReducer,
  },
});
