import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';
import { ingredientsSelector } from '../../services/slices/ingredientsSlice';

import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

import styles from './home.module.css';

function Home() {
  const { isLoaded, hasError } = useSelector(ingredientsSelector);

  return (
    <main className={styles.content}>
      {hasError && 'Ошибка загрузки'}
      {isLoaded && (
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      )}
    </main>
  );
}

export default Home;
