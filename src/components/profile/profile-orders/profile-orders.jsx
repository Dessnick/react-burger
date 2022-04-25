import React from 'react';

import styles from './profile-orders.module.css';

function ProfileOrders() {
  return (
    <div className={styles.container}>
      <p
        className={`${styles.text} text text_type_main-large text_color_inactive`}
      >
        История заказов
      </p>
    </div>
  );
}

export default ProfileOrders;
