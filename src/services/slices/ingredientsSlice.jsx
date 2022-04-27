/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { baseUrl } from '../../utils/constants';

const initialState = {
  ingredients: [],
  cartIngredients: [],
  totalPrice: 0,
  isLoaded: false,
  hasError: false,
  ingredientDetails: null,
  ingredientDetailsModalIsActive: false,
  cartItemModalIsActive: false,
  orderID: 0,
  orderName: '',
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
    addIngredientToCart: {
      reducer: (state, { payload }) => {
        state.cartIngredients.push(payload);
      },
      prepare: (item) => {
        const id = nanoid();
        return { payload: { ...item, id } };
      },
    },
    removeIngredientFromCart: (state, action) => {
      if (action.payload.type === 'bun') {
        state.cartIngredients = state.cartIngredients.filter(
          (item) => item.type !== 'bun'
        );
      } else {
        state.cartIngredients = [...state.cartIngredients].filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
    dragIngredients: (state, action) => {
      const modifyingIngredients = state.cartIngredients.filter(
        (item) => item.type !== 'bun'
      );
      // eslint-disable-next-line prefer-destructuring
      modifyingIngredients[action.payload.drag] = modifyingIngredients.splice(
        action.payload.hover,
        1,
        modifyingIngredients[action.payload.drag]
      )[0];
      state.cartIngredients = modifyingIngredients.concat(
        state.cartIngredients.filter((item) => item.type === 'bun')
      );
    },
    closeOrderDetails: (state) => {
      state.cartItemModalIsActive = false;
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
      .addCase(fetchOrder.pending, (state, { payload }) => {
        state.isLoaded = true;
        state.hasError = false;
        state.orderID = 0;
        state.cartItemModalIsActive = true;
        state.orderName = 'Отправляем заказ на кухню. Пожалуйста, подождите...';
      })
      .addCase(fetchOrder.fulfilled, (state, { payload }) => {
        state.isLoaded = true;
        state.hasError = false;
        state.orderID = payload.order.number;
        state.orderName = payload.name;
        state.cartItemModalIsActive = true;
      })
      .addCase(fetchOrder.rejected, (state, { payload }) => {
        state.isLoaded = false;
        state.hasError = true;
        state.orderID = 0;
        state.orderName = '';
      })
      .addDefaultCase(() => {});
  },
});

export const ingredientsSelector = (state) => state.ingredients;

export const {
  showIngredientDetails,
  hideIngredientDetails,
  addIngredientToCart,
  removeIngredientFromCart,
  dragIngredients,
  closeOrderDetails,
} = ingredientsSlice.actions;

export const ingredientsSliceReducer = ingredientsSlice.reducer;
