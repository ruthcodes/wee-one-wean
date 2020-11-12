import React from "react";
import { FormikInput } from "./FormikInput";

interface TextInputProps {
  field: string;
  label: string;
  required: boolean;
}

const TextInput = function ({
  field,
  label,
  //required
} : TextInputProps) {
  return (
    <div className="FormField">
      <label className="FormLabel">{label}:</label>
      <FormikInput name={field} />
    </div>
  )
}

export { TextInput }