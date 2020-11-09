import combineReducers from 'react-combine-reducers';

import { ToastState, initialToastState, ToastAction, toastReducer } from "./toastReducer";
import { NavState, initialNavState, NavAction, navReducer } from "./navReducer";
import { MealState, initialMealState, MealAction, mealReducer } from "./mealReducer";

export type State = 
{
  toast: ToastState,
  nav: NavState,
  meals: MealState
}

export type Action = 
    ToastAction
  | NavAction
  | MealAction; 

type Reducer = (state: State, action: Action) => State;

const [reducer, initialState] = combineReducers<Reducer>({
  toast:    [toastReducer, initialToastState],
  nav:      [navReducer, initialNavState],
  meals:    [mealReducer, initialMealState]
});


export { initialState }
export { reducer }