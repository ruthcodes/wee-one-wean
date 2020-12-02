import React from "react";
import Select from 'react-select';
import { useFormikContext } from "formik";
import { SelectOption } from "../types/forms";
import { guessedMeal } from "../../helpers";



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

  return (
    <div className="FormField">
      <label className="FormLabel" htmlFor={field}>{label}:</label>
      <div className="FormInputContainer">
        <Select
          inputId={field}
          defaultValue={guessedMeal(new Date())}
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