/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  total: 0,
  totalToday: 0,
  currentOrder: null,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    saveData: (state, { payload }) => {
      state.orders = payload.orders;
      state.total = payload.total;
      state.totalToday = payload.totalToday;
    },
    setCurrentOrder: (state, { payload }) => {
      state.currentOrder = payload;
    },
  },
});

export const feedSelector = (state) => state.feed;

export const { saveData, setCurrentOrder } = feedSlice.actions;

export const feedSliceReducer = feedSlice.reducer;
