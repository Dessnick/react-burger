import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';

import { fetchIngredients } from '../../services/slices/ingredientsSlice';

import AppHeader from '../app-header/app-header';
import {
  Home,
  Login,
  Profile,
  Register,
  ForgotPassword,
  ResetPassword,
  IngredientPage,
} from '../../pages';
import Modal from '../modal/modal';
import ProtectedRoute from '../protected-route/protected-route';
import IngredientDetails from '../ingredient-details/ingredient-details';

import {
  authSelector,
  getUser,
  updateToken,
  checkLogin,
} from '../../services/slices/auth';
import { getCookies } from '../../utils/cookies';

function App() {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector(authSelector);
  const location = useLocation();
  const history = useHistory();

  const background = location.state && location.state.background;

  const handleOnCloseModal = () => {
    history.goBack();
  };

  React.useEffect(() => {
    dispatch(fetchIngredients());
    if (getCookies('refreshToken')) {
      dispatch(getUser());
      if (!isLoggedIn) {
        dispatch(updateToken());
        dispatch(getUser());
      }
    }
    dispatch(checkLogin());
  }, [dispatch, isLoggedIn]);

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/forgot-password" exact>
          <ForgotPassword />
        </Route>
        <Route path="/reset-password" exact>
          <ResetPassword />
        </Route>
        <ProtectedRoute path="/profile" exact>
          <Profile />
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact>
          <IngredientPage />
        </Route>
      </Switch>

      {background && (
        <Route path="/ingredients/:id">
          <Modal onClose={handleOnCloseModal} title="Детали ингредиента">
            <IngredientDetails />
          </Modal>
        </Route>
      )}
    </>
  );
}

export default App;
