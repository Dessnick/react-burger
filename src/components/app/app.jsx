import React from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { fetchIngredients } from '../../services/slices/ingredientsSlice';

import AppHeader from '../app-header/app-header';
import { Home, Login, Register, ForgotPassword } from '../../pages';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/login" exact>
            <Register />
          </Route>
          <Route path="/forgot-password" exact>
            <ForgotPassword />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
