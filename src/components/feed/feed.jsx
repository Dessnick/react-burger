/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';

function Feed({ orders }) {
  return (
    <>
      {orders.length > 0 && (
        <section>
          <h1 className="text text_type_main-large mt-10 mb-5">
            Лента заказов
          </h1>
          <ul className={`${styles.orders_list} custom-scroll`}>
            {orders.map((order) => (
              <OrderCard item={order} key={order._id} />
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

export default Feed;
