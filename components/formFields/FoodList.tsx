import React from "react";
import { useField } from "formik";

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
  return (
    <div className="FoodItem">{item.label}</div>
  )
}

type ListProps = {
  foodItems: FoodItem[],
  fieldName: string;
}
const FoodList: React.FC<ListProps> = ({ foodItems, fieldName }) => {
  return (
    <div className="FoodListContainer">
      {
        foodItems.map((fi, i) => (
          <FoodItem key={i} item={fi} />
        ))
      }
    </div>
  )
}

export default FoodList;