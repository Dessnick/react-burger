/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ingredientsSelector } from '../../services/slices/ingredientsSlice';

import styles from './ingredient-details.module.css';

function IngredientDetails() {
  const { ingredients } = useSelector(ingredientsSelector);

  const { id } = useParams();
  // eslint-disable-next-line no-underscore-dangle
  const selectedIngredient = React.useMemo(
    // eslint-disable-next-line no-underscore-dangle
    () => ingredients.find((item) => item._id === id),
    [ingredients, id]
  );

  return (
    <>
      {selectedIngredient && (
        <div className={`${styles['ingredient-details']} + pb-15`}>
          <img
            src={selectedIngredient.image_large}
            alt={selectedIngredient.name}
            className={styles['ingredient-details__image']}
          />
          <span className="text text_type_main-medium mb-8">
            {selectedIngredient.name}
          </span>
          <ul className={styles['nutrition-facts']}>
            <li className={`${styles['nutrition-facts-item']} + mr-5`}>
              <p className="text text_type_main-default text_color_inactive mb-2">
                Калории, ккал
              </p>
              <p className="text text_type_main-default text_color_inactive">
                {selectedIngredient.calories}
              </p>
            </li>
            <li className={`${styles['nutrition-facts-item']} + mr-5`}>
              <p className="text text_type_main-default text_color_inactive mb-2">
                Белки, г
              </p>
              <p className="text text_type_main-default text_color_inactive">
                {selectedIngredient.proteins}
              </p>
            </li>
            <li className={`${styles['nutrition-facts-item']} + mr-5`}>
              <p className="text text_type_main-default text_color_inactive mb-2">
                Жиры, г
              </p>
              <p className="text text_type_main-default text_color_inactive">
                {selectedIngredient.fat}
              </p>
            </li>
            <li className={`${styles['nutrition-facts-item']} + mr-5`}>
              <p className="text text_type_main-default text_color_inactive mb-2">
                Углеводы, г
              </p>
              <p className="text text_type_main-default text_color_inactive">
                {selectedIngredient.carbohydrates}
              </p>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default IngredientDetails;
