import Datetime from 'react-datetime';
import { useFormikContext } from 'formik';

type DateInputProps = {
  field: string,
  label: string,
  time: boolean
}

const DateInput = function ({
  field,
  label,
  time,
} : DateInputProps) {
  
  const formikContext = useFormikContext();

  return (
    <div className="FormField">
      <label className="FormLabel">{label}:</label>
      <div className="FormInputContainer">
        <Datetime 
          className="FormInput" 
          timeFormat={time} 
          dateFormat={!time}
          value={new Date()}
          onChange={(e) => formikContext.setFieldValue((field as any), e)}
        />
      </div>
    </div>
  )
}

export { DateInput }