import { combineReducers } from 'redux';

import { ingredientsSliceReducer } from '../slices/ingredientsSlice';
import { authSliceReducer } from '../slices/auth';

const rootReducer = combineReducers({
  ingredients: ingredientsSliceReducer,
  auth: authSliceReducer,
});

export default rootReducer;
