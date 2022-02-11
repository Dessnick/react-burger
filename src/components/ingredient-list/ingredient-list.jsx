import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient-list.module.css';

import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

import dataTypes from '../../utils/types';

const IngredientList = ({ ingredientName, ingredientList, tabRef }) => {
  const [modalState, setModalState] = React.useState(false);

  const toggleModalState = (ingredient) => {
    setModalState(ingredient);
  };

  return (
    <div ref={tabRef}>
      <h2 className="text text_type_main-medium">{ingredientName}</h2>
      <ul className={`${styles.ingredients_list} + pt-6 pb-10 pl-4 pr-4`}>
        {ingredientList.map((item) => (
          <li
            className={styles.item}
            key={item._id}
            onClick={() => toggleModalState(item)}
          >
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
              <Counter count={1} size="default"></Counter>
            </a>
          </li>
        ))}
      </ul>
      {modalState && (
        <>
          <Modal onClose={toggleModalState} title="Детали ингредиента">
            <IngredientDetails ingredient={modalState} />
          </Modal>
        </>
      )}
    </div>
  );
};

IngredientList.propTypes = {
  ingredientList: PropTypes.arrayOf(dataTypes),
};

export default IngredientList;
