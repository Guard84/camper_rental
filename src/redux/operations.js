import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://6684e82e56e7503d1ae1906b.mockapi.io/";

export const fetchAds = createAsyncThunk("ads/fetchAds", async (page) => {
  try {
    const response = await axios.get(`/adverts?page=${page}&limit=4`);
    return response.data;
  } catch (error) {
    throw Error(error.response.data.error || "Something went wrong");
  }
});

const adsSlice = createSlice({
  name: "ads",
  initialState: {
    ads: [],
    filteredAds: [],
    filters: {
      location: "",
      equipment: [],
      vehicleType: ""
    },
    status: "idle",
    error: null,
  },
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload;
      state.filteredAds = state.ads.filter(ad => {
        const { location, equipment, vehicleType } = state.filters;
        const matchesLocation = location ? ad.location.toLowerCase().includes(location.toLowerCase()) : true;
        const matchesEquipment = equipment.length > 0
          ? equipment.every(eq => ad.details[eq] > 0)
          : true;
        const matchesVehicleType = vehicleType ? ad.form === vehicleType : true;
        return matchesLocation && matchesEquipment && matchesVehicleType;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAds.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAds.fulfilled, (state, action) => {
        state.status = "succeeded";
        const newAds = action.payload.filter(
          (newAd) => !state.ads.some((ad) => ad._id === newAd._id)
        );
        state.ads = [...state.ads, ...newAds];
        state.filteredAds = state.ads.filter(ad => {
          const { location, equipment, vehicleType } = state.filters;
          const matchesLocation = location ? ad.location.toLowerCase().includes(location.toLowerCase()) : true;
          const matchesEquipment = equipment.length > 0
            ? equipment.every(eq => ad.details[eq] > 0)
            : true;
          const matchesVehicleType = vehicleType ? ad.form === vehicleType : true;
          return matchesLocation && matchesEquipment && matchesVehicleType;
        });
      })
      .addCase(fetchAds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setFilters } = adsSlice.actions;
export default adsSlice.reducer;

export const selectAllAds = (state) => state.ads.filteredAds;
export const selectAdById = (state, adId) =>
  state.ads.ads.find((ad) => ad._id === adId);
