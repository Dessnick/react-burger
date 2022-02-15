import React from 'react';
import PropTypes from 'prop-types';

import orderOK from '../../images/order-ok.gif';

import styles from './order-details.module.css';

function OrderDetails({ orderID }) {
  return (
    <div className={`${styles['order-details']} + pt-30 pb-30 pl-10 pr-10`}>
      <h2
        className={`${styles['order-details__id']} + text text_type_digits-large
        `}
      >
        {orderID !== '' ? orderID : '034536'}
      </h2>
      <p className="text text_type_main-medium mb-15">Идентификатор заказа</p>
      <img
        src={orderOK}
        alt="OK"
        className={styles['order-details__order-ok']}
      />
      <p className="text text_type_main-default mb-2 mt-15">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

OrderDetails.propTypes = {
  orderID: PropTypes.string.isRequired,
};

export default OrderDetails;
