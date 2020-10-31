import combineReducers from 'react-combine-reducers';

import { ToastState, initialToastState, ToastAction, toastReducer } from "./toastReducer";
import { NavState, initialNavState, NavAction, navReducer } from "./navReducer";

export type State = 
{
  toast: ToastState,
  nav: NavState
}

export type Action = 
  ToastAction & 
  NavAction;

type Reducer = (state: State, action: Action) => State;

const [reducer, initialState] = combineReducers<Reducer>({
  toast:    [toastReducer, initialToastState],
  nav:      [navReducer, initialNavState]
});


export { initialState }
export { reducer }