import React from "react";
import { FieldAttributes, useField } from "formik";

export function FormikInput<T>(props: FieldAttributes<T>) {
  const [field, meta, helpers] = useField(props);
  const error = meta.touched && meta.error;
  if (props.type === "textarea"){
    return (
      <div className="FormInputContainer">
        <textarea 
          {...(field as any)}
          {...props}
          id={field.name}
          className={`FormInput ${props.className} ${error ? 'InputError' : ''}`} 
        />
        {error && <div className="ErrorMsg">{meta.error}</div>}
      </div>
    )
  }
  return (
    <div className="FormInputContainer">
      <input 
        {...(field as any)}
        {...props}
        id={field.name}
        className={`FormInput ${error ? 'InputError' : ''}`} 
      />
      {error && <div className="ErrorMsg">{meta.error}</div>}
    </div>
    
  )
}