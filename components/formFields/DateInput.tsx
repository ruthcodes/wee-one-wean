import Datetime from 'react-datetime';

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
  return (
    <div className="FormField">
      <label className="FormLabel">{label}:</label>
      <div className="FormInputContainer">
        <Datetime 
          className="FormInput" 
          timeFormat={time} 
          dateFormat={!time}
          value={new Date()}
          onChange={(e) => console.log(e)}
        />
      </div>
    </div>
  )
}

export { DateInput }