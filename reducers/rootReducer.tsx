export type State = {
  toastVisible: boolean;
  toastMessage: string;
}

const initialState: State = {
  toastVisible: false,
  toastMessage: ""
}

const SHOW_TOAST = "app/SHOW_TOAST";
const HIDE_TOAST = "app/HIDE_TOAST";
const SET_TOAST_MESSAGE = "app/SET_TOAST_MESSAGE";

export type Action = 
  | {
    type: typeof SHOW_TOAST;
  }
  | {
    type: typeof HIDE_TOAST;
  }
  | {
    type: typeof SET_TOAST_MESSAGE;
  }

const Reducer = (state = initialState, action: Action): State => {
  switch(action.type) {
    case SHOW_TOAST:
      return {
        ...state,
        toastVisible: true
      }
    case HIDE_TOAST:
      return {
        ...state,
        toastVisible: false
      }
    case SET_TOAST_MESSAGE:
      return {
        ...state,
        toastMessage: action.payload
      }
      default:
        return state;
  }
}

export { initialState }
export { Reducer as reducer }