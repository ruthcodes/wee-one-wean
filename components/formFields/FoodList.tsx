import React from "react";

type Opinion = "positive" | "negative" | "neutral";

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
}
const FoodList: React.FC<ListProps> = ({ foodItems }) => {
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