import { configureStore } from '@reduxjs/toolkit';
import encyclopediaReducer from './slice';

const store = configureStore({
  reducer: {
    encyclopedia: encyclopediaReducer,
  },
});

export default store;