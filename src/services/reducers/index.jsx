import { combineReducers } from 'redux';

import { ingredientsSliceReducer } from '../slices/ingredientsSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsSliceReducer,
});

export default rootReducer;
