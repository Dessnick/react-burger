/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { wsUrl } from '../../utils/constants';
import { getCookies } from '../../utils/cookies';

const initialState = {
  webSocket: null,
  wsConnected: false,
  wsHasError: false,
};

export const webSocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    wsInit: (state, { payload }) => {
      // eslint-disable-next-line no-console
      console.log(payload);
    },
    wsSuccess: (state) => {
      state.wsConnected = true;
      state.wsHasError = false;
    },
    wsClose: (state) => {
      state.wsConnected = false;
      state.wsHasError = false;
    },
    wsError: (state) => {
      state.wsConnected = false;
      state.wsHasError = true;
    },
  },
});

export const webSocketSelector = (state) => state.webSocket;

export const { wsInit, wsClose, wsError, wsSuccess } = webSocketSlice.actions;

export const webSocketSliceReducer = webSocketSlice.reducer;

export const getAllOrders = () => (dispatch) => {
  dispatch(wsInit({ url: `${wsUrl}/orders/all` }));
};

export const getUserOrders = () => (dispatch) => {
  dispatch(
    wsInit({
      url: `${wsUrl}/orders`,
      token: getCookies('accessToken').slice(7),
    })
  );
};

export const closeWSConnection = () => (dispatch) => {
  dispatch(wsClose());
};
