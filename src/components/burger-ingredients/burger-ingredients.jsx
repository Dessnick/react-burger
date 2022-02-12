import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientList from '../ingredient-list/ingredient-list';

import dataTypes from '../../utils/types';

const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = React.useState('bun');

  const bunRef = React.useRef(null);
  const sauceRef = React.useRef(null);
  const mainRef = React.useRef(null);

  const buns = data.filter((ingredients) => ingredients.type === 'bun');
  const sauces = data.filter((ingredients) => ingredients.type === 'sauce');
  const mains = data.filter((ingredients) => ingredients.type === 'main');

  const handleTabClick = (evt, ref) => {
    setCurrent(evt);
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
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
      <div className={`${styles.ingredients_container} + mt-10 custom-scroll`}>
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
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(dataTypes),
};

export default BurgerIngredients;