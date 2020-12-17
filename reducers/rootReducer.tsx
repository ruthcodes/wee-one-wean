import combineReducers from 'react-combine-reducers';

import { ToastState, initialToastState, ToastAction, toastReducer } from "./toastReducer";
import { NavState, initialNavState, NavAction, navReducer } from "./navReducer";
import { MealState, initialMealState, MealAction, mealReducer } from "./mealReducer";
import { ModalState, initialModalState, ModalAction, modalReducer } from './modalReducer';

export type State = 
{
  toast: ToastState,
  nav: NavState,
  meals: MealState
  modal: ModalState
}

export type Action = 
    ToastAction
  | NavAction
  | MealAction
  | ModalAction;

type Reducer = (state: State, action: Action) => State;

const [reducer, initialState] = combineReducers<Reducer>({
  toast:    [toastReducer, initialToastState],
  nav:       [navReducer, initialNavState],
  meals:  [mealReducer, initialMealState],
  modal:  [modalReducer, initialModalState]
});


export { initialState }
export { reducer }