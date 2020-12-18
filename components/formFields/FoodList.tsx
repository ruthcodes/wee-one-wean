import React from "react";
import { useDispatch } from "../../pages/_app";

export type Opinion = "positive" | "negative" | "neutral";

export interface FoodItem {
  label: string;
  value: string;
  amount: string;
  opinion: Opinion;
}

type ItemProps = {
  item: FoodItem,
}

const FoodItem: React.FC<ItemProps> = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <div className="FoodItem">
      <div className="FoodItemName">{item.label}</div>
      <div className="FoodItemAmount">
        {item.amount || <button className="Btn" onClick={(e) => {
          e.preventDefault();
          dispatch({ type: "app/TOGGLE_MODAL"})
          }}>+</button>}
        </div>
      <div className="FoodItemOpinion">{item.opinion}</div>
    </div>
  )
}

type ListProps = {
  foodItems: FoodItem[],
  fieldName: string;
}
const FoodList: React.FC<ListProps> = ({ foodItems, fieldName }) => {
  return (
    <div className="FoodListContainer">
      <div className="FoodListHeader">
        <p className="FoodListHeaderItem">amount</p>
        <p className="FoodListHeaderItem">like?</p>
      </div>
      {
        foodItems.map((fi, i) => (
          <FoodItem key={i} item={fi} />
        ))
      }
    </div>
  )
}

export default FoodList;