import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
// import CartItem from '../cart-item/cart-item';
import ConstructorItem from '../constructor-item/constructor-item';

import {
  ingredientsSelector,
  addIngredientToCart,
  removeIngredientFromCart,
} from '../../services/slices/ingredientsSlice';

import styles from './burger-constructor.module.css';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { cartIngredients } = useSelector(ingredientsSelector);

  const ingredientsExceptBuns = cartIngredients.filter(
    (item) => item.type !== 'bun'
  );
  const bun = cartIngredients.find((item) => item.type === 'bun');

  const [{ canDrop, isOver }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      if (item.type === 'bun') {
        dispatch(removeIngredientFromCart(item));
        dispatch(addIngredientToCart(item));
      } else {
        dispatch(addIngredientToCart(item));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <section
      className={`${styles.constructor} + mt-25`}
      ref={dropTarget}
      style={{
        backgroundColor:
          canDrop && isOver ? 'rgba(74, 74, 150, .1' : 'transparent',
      }}
    >
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
        {ingredientsExceptBuns.length > 0 &&
          ingredientsExceptBuns.map((item, index) => (
            <ConstructorItem ingredient={item} index={index} key={item.id} />
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
      {/* <CartItem cartItems={cartItems} /> */}
    </section>
  );
}

export default BurgerConstructor;
