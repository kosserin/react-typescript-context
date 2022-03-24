import React, {useContext} from 'react';
import { IngredientsContext } from '../../store/ingredients-context';

import styles from './IngredientItem.module.css';

const IngredientItem: React.FC<{ title: string; id: string; amount: string }> = (props) => {

  const ingredientContext = useContext(IngredientsContext);

  const itemRemoveHandler = async() => {
    ingredientContext.removeIngredient(props.id);
    await fetch(`https://react-typescript-context-default-rtdb.europe-west1.firebasedatabase.app/ingredients/${props.id}.json`, {
      method: 'DELETE',
    })
  }

  return (
    <li onClick={itemRemoveHandler} id={"ingredient-item-" + props.id} className={styles['ingredient-item']}>
      <h3>{props.title}</h3>
      <span>{props.amount}x</span>
    </li>
  )
}

export default IngredientItem