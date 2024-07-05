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
    status: "idle",
    error: null,
  },
  reducers: {},
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
      })
      .addCase(fetchAds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default adsSlice.reducer;
