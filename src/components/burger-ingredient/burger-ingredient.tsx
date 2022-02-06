import React from 'react';
import styles from './burger-ingredient.module.css';

import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredient = ({ ingredientName, ingredientList }) => {
  return (
    <section>
      <h2 className="text text_type_main-medium">{ingredientName}</h2>
      <ul className={`${styles.ingredients_list} + pt-6 pb-10 pl-4 pr-4`}>
        {ingredientList.map((item) => {
          return (
            <li className={styles.item} key={item._id}>
              <a href="#" className={`${styles.link} + mb-8`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={`${styles.image} + pl-4 pr-4`}
                />
                <div className={`${styles.price_container} + pt-1 pb-1`}>
                  <p className="text text_type_digits-default mr-2">
                    {item.price}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
                <p
                  className={`${styles.caption} + "text text_type_main-default mb-6"`}
                >
                  {item.name}
                </p>
                <Counter count={0} size="default"></Counter>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default BurgerIngredient;
