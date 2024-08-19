export const selectFavorites = (state) => state.favorites;
export const isFavorite = (state, _id) =>
  state.favorites.some((fav) => fav._id === _id);
export const selectAllAds = (state) => state.ads.filteredAds;
export const selectAdById = (state, adId) =>
  state.ads.ads.find((ad) => ad._id === adId);
