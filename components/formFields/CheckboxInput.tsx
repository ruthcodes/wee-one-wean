import React from "react";
import { SelectOption } from "../types/forms";

interface CheckboxInputProps {
  field: string;
  label: string;
  options: SelectOption[]
}

const CheckboxInput = function ({
  field,
  label,
  options
} : CheckboxInputProps) {
  return (
    <div className="FormField CheckboxFormField">
      <label className="FormLabel">
        {label}:
      </label>
      <div className="CheckboxContainer">
        {
          options.map((o: SelectOption, i: number) => {
            return (
              <React.Fragment key={`check ${i}`}>
                <input 
                  type="checkbox"
                  id={o.value}
                />
                <label className="CustomCheckbox" htmlFor={o.value}>
                  {o.label}
                </label>
              </React.Fragment>
            )
          })
        }
      </div>
      
      
    </div>
  )
}

export { CheckboxInput }