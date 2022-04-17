import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector, useDispatch } from 'react-redux';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  ingredientsSelector,
  fetchIngredients,
} from '../../services/slices/ingredientsSlice';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import styles from './app.module.css';

function App() {
  const dispatch = useDispatch();
  const { isLoaded, hasError } = useSelector(ingredientsSelector);
  React.useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      {hasError && 'Ошибка загрузки'}
      {isLoaded && (
        <main className={styles.content}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      )}
    </>
  );
}

export default App;
