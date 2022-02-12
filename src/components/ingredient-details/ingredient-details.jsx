import React from 'react';
import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types';

import dataTypes from '../../utils/types';

const IngredientDetails = ({ ingredient }) => {
  return (
    <div className={`${styles['ingredient-details']} + pb-15`}>
      <img
        src={ingredient.image_large}
        alt={ingredient.name}
        className={styles['ingredient-details__image']}
      />
      <span className="text text_type_main-medium mb-8">{ingredient.name}</span>
      <ul className={styles['nutrition-facts']}>
        <li className={`${styles['nutrition-facts-item']} + mr-5`}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Калории, ккал
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.calories}
          </p>
        </li>
        <li className={`${styles['nutrition-facts-item']} + mr-5`}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.proteins}
          </p>
        </li>
        <li className={`${styles['nutrition-facts-item']} + mr-5`}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.fat}
          </p>
        </li>
        <li className={`${styles['nutrition-facts-item']} + mr-5`}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};

IngredientDetails.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
  }),
};

export default IngredientDetails;
