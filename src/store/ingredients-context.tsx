import React, {useEffect, useState} from 'react';
import Ingredient from '../models/ingredient';

type IngredientContextObj = {
    ingredients: Ingredient[];
    addIngredient: (objectWithValues: onlyTitleAmount) => void;
    removeIngredient: (ingredientId: string) => void;
    searchIngredient: (filteredIngredients: Ingredient[]) => void;
}

type onlyTitleAmount = {
    title: string;
    amount: string;
}

export const IngredientsContext = React.createContext<IngredientContextObj>({
    ingredients: [],
    addIngredient: (objectWithValues: onlyTitleAmount) => {},
    removeIngredient: (id: string) => {},
    searchIngredient: (filteredIngredients: Ingredient[]) => {}
})

const IngredientsContextProvider: React.FC = (props) => {

    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    const fetchData = async():Promise<any> => {
        const response = await fetch('https://react-typescript-context-default-rtdb.europe-west1.firebasedatabase.app//ingredients.json', {
            method: 'GET'
        });
        const data = await response.json();
        console.log(data);
        let loadedIngredients: Ingredient[] = [];
        for(const key in data) {
            loadedIngredients.push({
                id: key,
                title: data[key].title,
                amount: data[key].amount
            })
        }

        setIngredients(loadedIngredients)
    }

    useEffect(() => {
        fetchData();
    }, [])

    const addIngredientHandler = (objectWithValues: onlyTitleAmount) => {
        setIngredients(prevIngredients => {
            const newIngredient = new Ingredient(objectWithValues.title, objectWithValues.amount);

            return prevIngredients.concat(newIngredient);
        })
    }

    const removeIngredientHandler = (id: string) => {
        setIngredients(prevIngredients  => {
            return prevIngredients.filter(ingredient => ingredient.id !== id);
        })
    }

    const searchedIngredientsHandler = (filteredIngredients: Ingredient[]) => {
        setIngredients(filteredIngredients);
    }


    const ingredientsValue: IngredientContextObj = {
        ingredients: ingredients,
        addIngredient: addIngredientHandler,
        removeIngredient: removeIngredientHandler,
        searchIngredient: searchedIngredientsHandler
    }

    return (
        <IngredientsContext.Provider value={ingredientsValue}>
            {props.children}
        </IngredientsContext.Provider>
    )

}

export default IngredientsContextProvider;