import React, {useContext, useRef, useEffect} from 'react';
import { IngredientsContext } from '../../store/ingredients-context';

import styles from './NewIngredient.module.css';

const NewIngredient = () => {

  const ingredientContext = useContext(IngredientsContext);
  const titleValueRef = useRef<HTMLInputElement>(null);
  const amountValueRef = useRef<HTMLInputElement>(null);

  const formSubmitHandler = async(e: React.FormEvent) => {
    e.preventDefault();
    const enteredTitle = titleValueRef.current!.value;
    const enteredAmount = amountValueRef.current!.value;

    if(enteredTitle.trim().length === 0 || enteredAmount.trim().length === 0) {
      return;
    } else {
          const newIngredientObject = {
            title: enteredTitle,
            amount: enteredAmount
          }
          ingredientContext.addIngredient(newIngredientObject);
          await fetch('https://react-typescript-context-default-rtdb.europe-west1.firebasedatabase.app//ingredients.json', {
            method: 'POST',
            body: JSON.stringify(newIngredientObject),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          titleValueRef.current!.value = '';
    }
  }

  return (
    <form className={styles['new-ingredient']} onSubmit={formSubmitHandler}>
        <h2>Add new Ingredient and choose amount 🍔</h2>
        <div className={styles['form-group']}>
            <label htmlFor='titleInput'>Title of Ingredient</label>
            <input ref={titleValueRef} type="text" id='titleInput' />
        </div>
        <div className={styles['form-group']}>
            <label htmlFor='amountInput'>Amount of Ingredient</label>
            <input ref={amountValueRef} type="number" id='amountInput' defaultValue='1' />
        </div>
        <button type='submit'>Add Ingredient</button>
    </form>
  )
}

export default NewIngredient