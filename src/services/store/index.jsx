import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers';

const store = configureStore({
  reducer: { ingredients: rootReducer },
});

export default store;
