import React from 'react';
import { useSelector } from 'react-redux';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientList from '../ingredient-list/ingredient-list';

import { ingredientsSelector } from '../../services/slices/ingredientsSlice';

import styles from './burger-ingredients.module.css';

function BurgerIngredients() {
  const [current, setCurrent] = React.useState('bun');

  const bunRef = React.useRef(null);
  const sauceRef = React.useRef(null);
  const mainRef = React.useRef(null);

  const { ingredients } = useSelector(ingredientsSelector);

  const buns = ingredients.filter((items) => items.type === 'bun');
  const sauces = ingredients.filter((items) => items.type === 'sauce');
  const mains = ingredients.filter((items) => items.type === 'main');

  const handleTabClick = (evt, ref) => {
    setCurrent(evt);
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    ingredients.length && (
      <section>
        <h1 className="text text_type_main-large mt-10 mb-5">
          Соберите бургер
        </h1>
        <div className={styles.tabs}>
          <Tab
            value="bun"
            active={current === 'bun'}
            onClick={(evt) => handleTabClick(evt, bunRef)}
          >
            Булки
          </Tab>
          <Tab
            value="sauce"
            active={current === 'sauce'}
            onClick={(evt) => handleTabClick(evt, sauceRef)}
          >
            Соусы
          </Tab>
          <Tab
            value="main"
            active={current === 'main'}
            onClick={(evt) => handleTabClick(evt, mainRef)}
          >
            Начинки
          </Tab>
        </div>
        <div
          className={`${styles.ingredients_container} + mt-10 custom-scroll`}
        >
          <IngredientList
            ingredientName="Булки"
            ingredientList={buns}
            tabRef={bunRef}
          />
          <IngredientList
            ingredientName="Соусы"
            ingredientList={sauces}
            tabRef={sauceRef}
          />
          <IngredientList
            ingredientName="Начинки"
            ingredientList={mains}
            tabRef={mainRef}
          />
        </div>
      </section>
    )
  );
}

export default BurgerIngredients;
