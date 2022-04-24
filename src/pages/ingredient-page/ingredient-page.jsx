import React from 'react';

import IngredientDetails from '../../components/ingredient-details/ingredient-details';

import styles from './ingredient-page.module.css';

function IngredientPage() {
  return (
    <div className={styles.content}>
      <IngredientDetails />
    </div>
  );
}

export default IngredientPage;
