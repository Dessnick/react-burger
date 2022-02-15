import React from 'react';
import PropTypes from 'prop-types';

import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import CartItem from '../cart-item/cart-item';

import styles from './burger-constructor.module.css';

import dataTypes from '../../utils/types';

function BurgerConstructor({ data }) {
  const ingredientsExceptBuns = data.filter(
    (ingredients) => ingredients.type !== 'bun'
  );
  const firstBun = data[0];

  const cartItems = [].concat(firstBun, ingredientsExceptBuns, firstBun);

  return (
    <section className={`${styles.constructor} + mt-25`}>
      <div className={`${styles.constructor__item_locked} + mb-4 ml-8`}>
        <ConstructorElement
          type="top"
          isLocked
          text={`${firstBun.name} (верх)`}
          price={firstBun.price}
          thumbnail={firstBun.image}
        />
      </div>
      <ul className={`${styles.constructor__list} custom-scroll`}>
        {ingredientsExceptBuns.map((ingredient) => (
          <li
            className={`${styles.constructor__item} + pl-2 pr-2`}
            // eslint-disable-next-line no-underscore-dangle
            key={ingredient._id}
          >
            <DragIcon type="primary" />
            <ConstructorElement
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
            />
          </li>
        ))}
      </ul>
      <div className={`${styles.constructor__item_locked} + mt-4 ml-8`}>
        <ConstructorElement
          type="bottom"
          isLocked
          text={`${firstBun.name} (низ)`}
          price={firstBun.price}
          thumbnail={firstBun.image}
        />
      </div>
      <CartItem cartItems={cartItems} />
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(dataTypes).isRequired,
};

export default BurgerConstructor;
