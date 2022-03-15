import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';

import {
  ingredientsSelector,
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
          // eslint-disable-next-line no-underscore-dangle
          <BurgerIngredient ingredient={item} key={item._id} />
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
