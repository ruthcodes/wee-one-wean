import React from "react";
import { FieldAttributes, useField } from "formik";

export function FormikInput<T>(props: FieldAttributes<T>) {
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