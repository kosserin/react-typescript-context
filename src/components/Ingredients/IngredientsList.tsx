import { useContext } from 'react';
import { IngredientsContext } from '../../store/ingredients-context';
import IngredientItem from './IngredientItem';
import { TransitionGroup } from 'react-transition-group';
import { CSSTransition } from 'react-transition-group';

import './IngredientsList.css';

const IngredientsList = () => {

  const ingredientsCtx = useContext(IngredientsContext);

  return (
    <TransitionGroup component="ul" className='ingredients-list'>{ingredientsCtx.ingredients.map(ig => {
      return <CSSTransition classNames='removing' timeout={300} key={ig.id}>
              <IngredientItem id={ig.id} title={ig.title} amount={ig.amount} />
      </CSSTransition>
    })}</TransitionGroup>
  )
}

export default IngredientsList