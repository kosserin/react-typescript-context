import React from 'react';
import Search from '../Search/Search';

import styles from './Ingredients.module.css';
import IngredientsList from './IngredientsList';
import NewIngredient from './NewIngredient';

const Ingredients = () => {
  return (
    <div className={styles.ingredients}>
        <NewIngredient />
        <Search />
        <IngredientsList />
    </div>
  )
}

export default Ingredients