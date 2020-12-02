import React, { useState } from "react";
import { SelectOption } from "../types/forms";
import { useFormikContext } from "formik";

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
  const formikContext = useFormikContext()

  const handleChange = (e: React.SyntheticEvent) => {
    const nextState = {
      ...formikContext.values[field],
      [e.target.name]: e.target.checked
    }
    formikContext.setFieldValue(field, nextState)
  }

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
                  name={o.value}
                  type="checkbox"
                  id={o.value}
                  onChange={(e) => handleChange(e)}
                  checked={formikContext.values[field][o.value]}
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