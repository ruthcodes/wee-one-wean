import { SelectOption } from "../components/types/forms";

export interface Drink {milk: boolean , water: boolean}
export interface MealDetails {
  date: Date;
  time: Date;
  meal: SelectOption;
  //food: string[];
  food: string;
  drink: Drink;
  notes: string;
}

export type MealState = {
  meals: MealDetails[];
}

const initialState: MealState = {
  meals: []
}

const ADD_MEAL = "app/ADD_MEAL";

export type MealAction = 
  | {
    type: typeof ADD_MEAL;
    payload: MealDetails;
  };

const Reducer = (state = initialState, action: MealAction): MealState => {
  switch(action.type) {
    case ADD_MEAL:
      return {
        ...state,
        meals: [...state.meals, action.payload]
      }
      default:
        return state;
  }
}

export { initialState as initialMealState }
export { Reducer as mealReducer }