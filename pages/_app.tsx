import React from "react";
import { reducer, initialState, State, Action } from "../reducers/rootReducer";

const StoreContext = React.createContext<null | State>(null);
const DispatchContext = React.createContext<null | React.Dispatch<Action>>(null);

export function useStore() {
  const store = React.useContext(StoreContext);
  if (store == null) throw new Error("Must be used in a StoreContext provider");
  return store;
}

export function useDispatch() {
  const dispatch = React.useContext(DispatchContext);
  if (dispatch == null)
    throw new Error("Must be used in a DispatchContext provider");
  return dispatch;
}

function MyApp({ Component, pageProps }) {
const [store, dispatch] = React.useReducer(reducer, initialState)

  return (
    <DispatchContext.Provider value={dispatch}>
      <StoreContext.Provider value={store}>
        <Component {...pageProps} />
      </StoreContext.Provider>
    </DispatchContext.Provider>
  )
  
}

export default MyApp
