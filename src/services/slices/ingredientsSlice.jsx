/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import baseUrl from '../../utils/data';

const initialState = {
  ingredients: [],
  totalPrice: 0,
  isLoaded: false,
  hasError: false,
  ingredientDetails: null,
  ingredientDetailsModalIsActive: false,
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (data, { rejectedResult }) => {
    try {
      const res = await fetch(`${baseUrl}/ingredients`);
      const result = await res.json();
      return result;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return rejectedResult(e.message);
    }
  }
);

export const fetchOrder = createAsyncThunk(
  'ingredients/fetchOrder',
  async (data, { rejectedResult }) => {
    try {
      const res = await fetch(`${baseUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        // eslint-disable-next-line no-underscore-dangle
        body: JSON.stringify({ ingredients: data.map((item) => item._id) }),
      });
      const result = await res.json();
      return result;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return rejectedResult(e.message);
    }
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    showIngredientDetails: (state, action) => {
      state.ingredientDetails = action.payload;
      state.ingredientDetailsModalIsActive = true;
    },
    hideIngredientDetails: (state) => {
      state.ingredientDetails = null;
      state.ingredientDetailsModalIsActive = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, { payload }) => {
        state.isLoaded = true;
        state.hasError = false;
        state.ingredients = payload.data;
      })
      .addCase(fetchIngredients.rejected, (state, { payload }) => {
        state.isLoaded = false;
        state.hasError = true;
      })
      // .addCase(fetchOrder.pending, (state) => {
      //   state.isLoaded = false;
      // })
      // .addCase(fetchOrder.fulfilled, (state, { payload }) => {
      //   state.isLoaded = true;
      //   state.hasError = false;
      //   state.orderId = payload.order.number;
      //   state.orderName = payload.name;
      //   state.orderModal = true;
      // })
      // .addCase(fetchOrder.rejected, (state, { payload }) => {
      //   state.isLoaded = false;
      //   state.hasError = true;
      //   state.orderId = 0;
      //   state.orderName = '';
      // })
      .addDefaultCase(() => {});
  },
});

export const ingredientsSelector = (state) => state.ingredients.ingredients;

export const {
  // gettingIngredients,
  // gettingIngredientsSuccess,
  // gettingIngredientsError,
  showIngredientDetails,
  hideIngredientDetails,
} = ingredientsSlice.actions;

export const ingredientsSliceReducer = ingredientsSlice.reducer;
