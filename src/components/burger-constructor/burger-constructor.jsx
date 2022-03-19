import React from 'react';

import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import CartItem from '../cart-item/cart-item';

import BurgerConstructorContext from '../../services/burgerConstructorContext';

import styles from './burger-constructor.module.css';

function BurgerConstructor() {
  const { state } = React.useContext(BurgerConstructorContext);
  const { data } = state;

  const ingredientsExceptBuns = data.filter((item) => item.type !== 'bun');
  const bun = data.find((item) => item.type === 'bun');

  const cartItems = [].concat(bun, ingredientsExceptBuns, bun);

  return (
    <section className={`${styles.constructor} + mt-25`}>
      <div className={`${styles.constructor__item_locked} + mb-4 ml-8`}>
        {bun && (
          <ConstructorElement
            type="top"
            isLocked
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}
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
        {bun && (
          <ConstructorElement
            type="bottom"
            isLocked
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}
      </div>
      <CartItem cartItems={cartItems} />
    </section>
  );
}

export default BurgerConstructor;
