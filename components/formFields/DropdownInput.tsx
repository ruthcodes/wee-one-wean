import React from "react";
import Select from 'react-select';
import { useFormikContext } from "formik";
import { SelectOption } from "../types/forms";



type DropdownInputProps = {
  field: string,
  label: string,
  options: SelectOption[],
  time: string
}

const DropdownInput = function ({
  field,
  label,
  options,
  time
} : DropdownInputProps) {

  const formikContext = useFormikContext();

  const guessedMeal = () => {
    switch (new Date(time).getHours()) {
      case 7:
      case 8:
      case 9:
        return {value: "Breakfast", label: "Breakfast"}
      case 11:
      case 12:
      case 13:
        return {value: "Lunch", label: "Lunch"}
      case 17:
      case 18:
      case 19:
        return {value: "Dinner", label: "Dinner"}
      default:
        return {value: "Snack", label: "Snack"}
    }
  }

  return (
    <div className="FormField">
      <label className="FormLabel" htmlFor={field}>{label}:</label>
      <div className="FormInputContainer">
        <Select
          inputId={field}
          defaultValue={guessedMeal()}
          className={"DropdownContainer"}
          classNamePrefix="Dropdown"
          isSearchable={false}
          options={options}
          onChange={(e) => formikContext.setFieldValue((field as any), e)}
          theme={theme => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary50: "#C6C4C2",
              primary25: "#EEEDEC",
              primary: "#6ab734",
            },
          })}
        />
      </div>
    </div>
  )
}

export { DropdownInput }