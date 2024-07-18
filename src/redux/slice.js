import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('favorites')) || [];

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.push(action.payload);
      localStorage.setItem('favorites', JSON.stringify(state));
    },
    removeFavorite: (state, action) => {
      const updatedState = state.filter(fav => fav._id !== action.payload._id);
      localStorage.setItem('favorites', JSON.stringify(updatedState));
      return updatedState;
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
