import React from "react";
import { FieldAttributes, useField } from "formik";

function Input<T>(props: FieldAttributes<T>) {
  const [field, meta, helpers] = useField(props);
  const error = meta.touched && meta.error;

  return (
    <div className="FormInputContainer">
      <input 
        {...(field as any)}
        {...props} 
        className={`FormInput ${error ? 'InputError' : ''}`} 
      />
      {error && <div className="ErrorMsg">{meta.error}</div>}
    </div>
    
  )
}

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
      <Input name={field} />
    </div>
  )
}

export { TextInput }