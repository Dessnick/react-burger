/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';

import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
  showIngredientDetails,
  ingredientsSelector,
} from '../../services/slices/ingredientsSlice';
import dataTypes from '../../utils/types';

import styles from './burger-ingredient.module.css';

function BurgerIngredient({ ingredient }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const { cartIngredients } = useSelector(ingredientsSelector);
  const count = cartIngredients.filter(
    // eslint-disable-next-line no-underscore-dangle
    (item) => item._id === ingredient._id
  ).length;

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
  });

  return (
    <li
      className={styles.item}
      onClick={() => dispatch(showIngredientDetails(ingredient))}
    >
      <Link
        className={`${styles.link} + mb-8`}
        ref={dragRef}
        to={{
          // eslint-disable-next-line no-underscore-dangle
          pathname: `/ingredients/${ingredient._id}`,
          state: { background: location },
        }}
      >
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
        <p className={`${styles.caption} + "text text_type_main-default mb-6"`}>
          {ingredient.name}
        </p>
        <Counter count={count} size="default" />
      </Link>
    </li>
  );
}

BurgerIngredient.propTypes = {
  ingredient: dataTypes.isRequired,
};

export default BurgerIngredient;
