import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactsSlice';
import { deleteIdReducer } from './deleteSlice';
import { filterReducer } from './filterSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
    deleteId: deleteIdReducer,
  },
});
