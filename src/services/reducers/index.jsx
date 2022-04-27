import { combineReducers } from 'redux';

import { ingredientsSliceReducer } from '../slices/ingredientsSlice';
import { authSliceReducer } from '../slices/auth';
import { feedSliceReducer } from '../slices/feed';

const rootReducer = combineReducers({
  ingredients: ingredientsSliceReducer,
  auth: authSliceReducer,
  feed: feedSliceReducer,
});

export default rootReducer;
