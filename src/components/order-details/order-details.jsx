/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import PropTypes from 'prop-types';

import orderOK from '../../images/order-ok.gif';

import styles from './order-details.module.css';

function OrderDetails({ orderID, orderName }) {
  return (
    <>
      {orderID > 0 ? (
        <div className={`${styles['order-details']} + pt-30 pb-30 pl-10 pr-10`}>
          <h2
            className={`${styles['order-details__id']} + text text_type_digits-large
        `}
          >
            {orderID}
          </h2>
          <p className="text text_type_main-medium mb-15">
            Идентификатор заказа
          </p>
          <img
            src={orderOK}
            alt="OK"
            className={styles['order-details__order-ok']}
          />
          <p className="text text_type_main-default mb-2 mt-15">
            Ваш заказ начали готовить:
          </p>
          <p
            className={`${styles['order-name']} text text_type_main-default mt-5 mb-5`}
          >
            {orderName}
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
      ) : (
        <div className={`${styles['order-details']} + pt-30 pb-30 pl-10 pr-10`}>
          <p
            className={`${styles['order-name']} text text_type_main-default mt-5 mb-5`}
          >
            {orderName}
          </p>
        </div>
      )}
    </>
  );
}

OrderDetails.propTypes = {
  orderID: PropTypes.number.isRequired,
  orderName: PropTypes.string.isRequired,
};

export default OrderDetails;
