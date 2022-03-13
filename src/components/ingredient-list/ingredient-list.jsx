/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

import {
  ingredientsSelector,
  showIngredientDetails,
  hideIngredientDetails,
} from '../../services/slices/ingredientsSlice';

import styles from './ingredient-list.module.css';

import dataTypes from '../../utils/types';

function IngredientList({ ingredientName, ingredientList, tabRef }) {
  const { ingredientDetails, ingredientDetailsModalIsActive } =
    useSelector(ingredientsSelector);

  const dispatch = useDispatch();

  return (
    <div ref={tabRef}>
      <h2 className="text text_type_main-medium">{ingredientName}</h2>
      <ul className={`${styles.ingredients_list} + pt-6 pb-10 pl-4 pr-4`}>
        {ingredientList.map((item) => (
          <li
            className={styles.item}
            // eslint-disable-next-line no-underscore-dangle
            key={item._id}
            onClick={() => dispatch(showIngredientDetails(item))}
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
              <Counter count={1} size="default" />
            </a>
          </li>
        ))}
      </ul>
      {ingredientDetailsModalIsActive && (
        <Modal
          title="Детали ингредиента"
          onClose={() => dispatch(hideIngredientDetails())}
        >
          <IngredientDetails ingredient={ingredientDetails} />
        </Modal>
      )}
    </div>
  );
}

IngredientList.propTypes = {
  ingredientName: PropTypes.string.isRequired,
  ingredientList: PropTypes.arrayOf(dataTypes).isRequired,
  tabRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default IngredientList;
