import React from 'react';
import PropTypes from 'prop-types';
import styles from './cart-item.module.css';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import CartCurrencyIcon from '../currency-icon/cart-currency-icon';

import dataTypes from '../../utils/types';

const CartItem = ({ cartItems }) => {
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className={`${styles['cart-item']} + mt-10 ml-4 mr-4`}>
      <div className={`${styles['cart-item__total-container']} + mr-10`}>
        <span
          className={`${styles['cart-item__total']} + text text_type_digits-medium mr-2`}
        >
          {totalPrice}
        </span>
        <CartCurrencyIcon />
      </div>
      <Button type="primary" size="medium">
        Оформить заказ
      </Button>
    </div>
  );
};

CartItem.propTypes = {
  cartItems: PropTypes.arrayOf(dataTypes.isRequired).isRequired,
};

export default CartItem;
