export type NavState = {
  navOpen: boolean;
}

const initialState: NavState = {
  navOpen: false
}

const TOGGLE_NAV = "app/TOGGLE_NAV";

export type NavAction = 
  | {
    type: typeof TOGGLE_NAV;
  };

const Reducer = (state = initialState, action: NavAction): NavState => {
  switch(action.type) {
    case TOGGLE_NAV:
      return {
        ...state,
        navOpen: !state.navOpen
      }
      default:
        return state;
  }
}

export { initialState as initialNavState }
export { Reducer as navReducer }