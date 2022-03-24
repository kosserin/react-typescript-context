import React from 'react';
import Ingredients from './components/Ingredients/Ingredients';
import IngredientsContextProvider from './store/ingredients-context';

const App = () => {
  return (
    <IngredientsContextProvider>
      <Ingredients />
    </IngredientsContextProvider>
  );
}

export default App;
