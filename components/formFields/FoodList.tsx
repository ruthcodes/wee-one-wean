import React from "react";
import { useDispatch } from "../../pages/_app";
import Select, { components } from 'react-select';
import { SelectOptionIcon } from "../../types/forms";

import { FormikContextType, FormikValues, useFormikContext } from "formik";

import positive from "../../assets/positive.svg";
import negative from "../../assets/negative.svg";
import neutral from "../../assets/neutral.svg";

export type Opinion = "positive" | "negative" | "neutral";

const opinions: SelectOptionIcon[] = [
  {label: "Positive", value: "positive", icon: positive},
  {label: "Negative", value: "negative", icon: negative},
  {label: "Neutral", value: "neutral", icon: neutral}
]

const { Option, SingleValue } = components;
const IconOption = (props) => (
  <Option {...props}>
    <img
      src={props.data.icon}
      style={{ width: 25 }}
      alt={props.data.label}
    />
  </Option>
);

const IconSingleValue= (props) => (
  <SingleValue {...props}>
    <img
      src={props.data.icon}
      style={{ width: 25 }}
      alt={props.data.label}
    />
  </SingleValue>
);

const customStyles = {
  valueContainer: () => ({
    width: 30,
    height: 30
  }),
  indicatorContainer: () => ({
    width: 30,
    height: 30
  }),
  dropdownIndicator: () => ({
    width: 20,
    height: 20
  })
}

type OpinionProps = {
  formik: FormikContextType<FormikValues>,
  field: string,
  item: FoodItem
}

const Opinion: React.FC<OpinionProps> = ({ formik, field, item }) => {

  const handleChange = (e: SelectOptionIcon) => {

    const currentFormikVals: FoodItem[] = [...formik.values[field]];
    const indexToUpdate = currentFormikVals.findIndex((i) => i.value === item.value)
    const itemToUpdate = currentFormikVals[indexToUpdate]
    
    itemToUpdate.opinion = e.value as Opinion;

    currentFormikVals[indexToUpdate] = itemToUpdate;
    formik.setFieldValue(field, currentFormikVals)

  }
  const initialOpinion = opinions.find((v: SelectOptionIcon) => v.value === item.opinion);
  return (
    <Select 
      defaultValue={initialOpinion}
      options={opinions}
      onChange={handleChange}
      isSearchable={false}
      styles={customStyles}
      components={{ Option: IconOption, SingleValue: IconSingleValue }}
    />
  )
}


export interface FoodItem {
  label: string;
  value: string;
  amount: string;
  opinion: Opinion;
}

type ItemProps = {
  item: FoodItem,
  field: string
}

const FoodItem: React.FC<ItemProps> = ({ item, field }) => {
  const dispatch = useDispatch();
  const formikContext = useFormikContext();

  const handleChange = (e: React.MouseEvent) => {
    e.preventDefault()
    const currentVal: FoodItem[] = [...formikContext.values[field]];
    formikContext.setFieldValue(field, currentVal.filter((i:FoodItem )=> i.value !== item.value));
  }

  return (
    <div className="FoodItem">
      <div className="FoodItemName">{item.label}</div>
      <div className="FoodItemAmount">
        {item.amount || 
          <button 
            className="Btn BtnRound" 
            title="Add amount" 
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              dispatch({ type: "app/TOGGLE_MODAL"})
            }}>+
          </button>
        }
      </div>

      <div className="FoodItemOpinion">
        <Opinion formik={formikContext} field={field} item={item}/>
      </div>

      <div>
        <button 
          className="Btn BtnRound BtnCancel" 
          onClick={handleChange}
        >+
        </button>
      </div>
    </div>
  )
}

type ListProps = {
  foodItems: FoodItem[],
  fieldName: string
}
const FoodList: React.FC<ListProps> = ({ foodItems, fieldName }) => {
  return (
    <div className="FoodListContainer">
      {
        foodItems.map((fi, i) => (
          <FoodItem key={i} item={fi} field={fieldName} />
        ))
      }
    </div>
  )
}

export default FoodList;