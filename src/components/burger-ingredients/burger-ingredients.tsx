import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';

import {
  Tab,
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

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
        <h2 className="text text_type_main-medium">Булки</h2>
        <ul className={`${styles.ingredients_list} + pt-6 pb-10 pl-4 pr-4`}>
          {buns.map((ingredient) => {
            return (
              <li className={styles.item} key={ingredient._id}>
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className={`${styles.image} + pl-4 pr-4`}
                />
                <div className={`${styles.price_container} + pt-1 pb-1`}>
                  <p className="text text_type_digits-default mr-2">
                    {ingredient.price}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
                <p
                  className={`${styles.description} + "text text_type_main-default mb-6"`}
                >
                  {ingredient.name}
                </p>
                <Counter count={1} size="default"></Counter>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(dataTypes.isRequired).isRequired,
};

export default BurgerIngredients;
