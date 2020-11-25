import React from "react";
import { FormikInput } from "./FormikInput";

interface TextInputProps {
  field: string;
  label: string;
  required: boolean;
  type?: string;
}

const TextInput = function ({
  field,
  label,
  required,
  type
} : TextInputProps) {
  return (
    <div className="FormField">
      <label className="FormLabel" htmlFor={field}>{label}:</label>
      <FormikInput 
        name={field} 
        type={type ? type : "text"} 
        className={type === "textarea" && "FormInputArea"} 
      />
    </div>
  )
}

export { TextInput }