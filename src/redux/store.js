import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './slice';
import adsReducer from './operations';

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    ads: adsReducer,
  },
});

export default store;