import React, {useState, useRef, useEffect, useContext} from 'react';
import { IngredientsContext } from '../../store/ingredients-context';

import styles from './Search.module.css';

const Search = () => {

    const [enteredFilter, setEnteredFilter] = useState('');
    const searchValueRef = useRef<HTMLInputElement>(null);
    const ingredientContext = useContext(IngredientsContext);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (enteredFilter === searchValueRef.current!.value) {
              const query =
                enteredFilter.length === 0
                  ? ''
                  : `?orderBy="title"&equalTo="${enteredFilter}"`;
              fetch(
                'https://react-typescript-context-default-rtdb.europe-west1.firebasedatabase.app//ingredients.json' + query
              )
                .then(response => response.json())
                .then(responseData => {
                  const loadedIngredients = [];
                  for (const key in responseData) {
                    loadedIngredients.push({
                      id: key,
                      title: responseData[key].title,
                      amount: responseData[key].amount
                    });
                  }
                  console.log(loadedIngredients)
                  ingredientContext.searchIngredient(loadedIngredients)
                });
            }
          }, 500);
          return () => {
            clearTimeout(timer);
          };
    }, [enteredFilter])

    const valueChangeHandler = async(e:React.FormEvent<HTMLInputElement>) => {
        setEnteredFilter(e.currentTarget.value);
    }

  return (
    <form className={styles.search}>
        <label>Search by title:</label>
        <input ref={searchValueRef} type='text' value={enteredFilter} onChange={valueChangeHandler} />
    </form>
  )
}

export default Search