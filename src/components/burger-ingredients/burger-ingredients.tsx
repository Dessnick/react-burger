import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';

import {
  Tab,
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';

import dataTypes from '../../utils/types';

const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = React.useState('bun');
  const buns = data.filter((ingredients) => ingredients.type === 'bun');
  const sauces = data.filter((ingredients) => ingredients.type === 'sauce');
  const mains = data.filter((ingredients) => ingredients.type === 'main');

  return (
    <section>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={styles.tabs}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="bun" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="bun" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.ingredients_container} + mt-10`}>
        <BurgerIngredient ingredientName="Булки" ingredientList={buns} />
        <BurgerIngredient ingredientName="Соусы" ingredientList={sauces} />
        <BurgerIngredient ingredientName="Начинки" ingredientList={mains} />
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(dataTypes.isRequired).isRequired,
};

export default BurgerIngredients;
