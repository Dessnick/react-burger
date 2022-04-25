import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import CartCurrencyIcon from '../currency-icon/cart-currency-icon';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import {
  fetchOrder,
  ingredientsSelector,
  closeOrderDetails,
} from '../../services/slices/ingredientsSlice';
import { authSelector } from '../../services/slices/auth';

import styles from './cart-item.module.css';

function CartItem() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { cartIngredients, cartItemModalIsActive, orderID, orderName } =
    useSelector(ingredientsSelector);
  const { isLoggedIn } = useSelector(authSelector);

  const pushOrder = () => {
    if (!isLoggedIn) {
      history.replace({ pathname: '/login' });
    } else {
      dispatch(fetchOrder(cartIngredients));
    }
  };

  // React.useEffect(() => {
  //   const getTotalPrice = () => {
  //     let result = 0;
  //     if (cartIngredients.length > 0) {
  //       result =
  //         cartIngredients
  //           .filter((item) => item.type !== 'bun')
  //           .reduce((acc, item) => acc + item.price, 0) +
  //         (cartIngredients.some((item) => item.type === 'bun')
  //           ? cartIngredients.find((item) => item.type === 'bun').price * 2
  //           : 0);
  //     }
  //     setTotalPrice(result);
  //   };

  //   getTotalPrice();
  // }, [cartIngredients]);

  const totalPrice = React.useMemo(() => {
    let result = 0;
    if (cartIngredients.length > 0) {
      result =
        cartIngredients
          .filter((item) => item.type !== 'bun')
          .reduce((acc, item) => acc + item.price, 0) +
        (cartIngredients.some((item) => item.type === 'bun')
          ? cartIngredients.find((item) => item.type === 'bun').price * 2
          : 0);
    }
    return result;
  }, [cartIngredients]);

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
      <Button type="primary" size="medium" onClick={() => pushOrder()}>
        Оформить заказ
      </Button>
      {cartItemModalIsActive && (
        <Modal
          title=""
          onClose={() => {
            dispatch(closeOrderDetails());
          }}
        >
          <OrderDetails orderID={orderID} orderName={orderName} />
        </Modal>
      )}
    </div>
  );
}

export default CartItem;
