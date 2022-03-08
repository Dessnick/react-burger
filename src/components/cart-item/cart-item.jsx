import React from 'react';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import CartCurrencyIcon from '../currency-icon/cart-currency-icon';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import BurgerConstructorContext from '../../services/burgerConstructorContext';

import baseUrl from '../../utils/data';

import styles from './cart-item.module.css';

function CartItem() {
  const [orderID, setOrderID] = React.useState(0);
  const [orderName, setOrderName] = React.useState('');

  const { state, dispatch } = React.useContext(BurgerConstructorContext);
  const { totalPrice, data } = state;

  const [stateModal, setStateModal] = React.useState(false);

  const toggleStateModal = () => {
    setStateModal(!stateModal);
  };

  const getOrder = async () => {
    try {
      const res = await fetch(`${baseUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        // eslint-disable-next-line no-underscore-dangle
        body: JSON.stringify({ ingredients: data.map((item) => item._id) }),
      });
      if (!res.ok) {
        throw new Error(`getOrder: Ah shit, here we go again ${res.status}`);
      }
      const { order, name } = await res.json();
      setOrderID(order.number);
      setOrderName(name);
      toggleStateModal();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      setOrderID(0);
      setOrderName('Ошибка формирования заказа');
      // toggleStateModal();
    }
  };

  React.useEffect(() => {
    dispatch({ type: 'totalPrice' });
  }, [data, dispatch]);

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
      <Button type="primary" size="medium" onClick={getOrder}>
        Оформить заказ
      </Button>
      {stateModal && (
        <Modal title="" onClose={toggleStateModal}>
          <OrderDetails orderID={orderID} orderName={orderName} />
        </Modal>
      )}
    </div>
  );
}

export default CartItem;
