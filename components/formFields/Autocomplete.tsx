import { useFormikContext, FormikContextType, FormikValues, setNestedObjectValues } from 'formik';
import { useState, useRef, MutableRefObject, useEffect } from 'react';
import Autosuggest, { InputProps, SuggestionsFetchRequestedParams } from 'react-autosuggest';
import FoodList, { FoodItem } from './FoodList';
import { useDispatch, useStore } from '../../pages/_app';

interface AutocompleteProps {
  field: string;
  label: string;
}

// this will come from API
const suggestions: FoodItem[] = [
  {
    label: "Sweet potato",
    value: "sweet potato",
    amount: "",
    amountMeasurement: {value: "grams", label: "g"},
    opinion: "neutral",
  },
  {
    label: "Carrot",
    value: "carrot",
    amount: "",
    amountMeasurement: {value: "grams", label: "g"},
    opinion: "neutral",
  },
  {
    label: "Squash",
    value: "squash",
    amount: "",
    amountMeasurement: {value: "grams", label: "g"},
    opinion: "neutral",
  },
  {
    label: "Potato",
    value: "potato",
    amount: "",
    amountMeasurement: {value: "grams", label: "g"},
    opinion: "neutral",
  },
]

const getSuggestions = function (userInput: string): FoodItem[] {
  const value = userInput.trim().toLowerCase();
  const valueLength = value.length;

  return (
    valueLength === 0 ? 
      [] :
      suggestions.filter(
        suggestion => 
        suggestion.value.slice(0, valueLength) === value
      )
  )
}

// populate input based on selected suggestion
const getSuggestionValue = (
  suggestion: FoodItem,
  formikContext: FormikContextType<FormikValues>,
  field: string
) => {
  const currentVal = [...formikContext.values[field]]
  if (currentVal.find(e => e.value === suggestion.value) === undefined){
    formikContext.setFieldValue(field, [...currentVal, suggestion])
    return ""
  }
  return (
    suggestion.value
  )
}

const renderSuggestion = (suggestion: FoodItem) => (
  <div>{suggestion.label}</div>
)

const Autocomplete = ({
  field,
  label
}: AutocompleteProps) => {
  const formikContext = useFormikContext();
  
  const [val, setVal] = useState<string>("");
  const [suggestions, setSuggestions] = useState<FoodItem[]>([])

  const handleChange = (
    e: React.SyntheticEvent, 
    { newValue }: {newValue: string}
  ) => {
    setVal(newValue)
  }

  // update suggestions list
  const onSuggestionsFetchRequested = (fetched: SuggestionsFetchRequestedParams) => {
    setSuggestions(getSuggestions(fetched.value))
  }

  const onSuggestionsClearRequested = () => setSuggestions([])

  const inputProps: InputProps<FoodItem> = {
    value: val,
    onChange: handleChange,
  }

  // custom onChangeHandler due to issue with @types
  // https://stackoverflow.com/questions/61785523/autosuggest-renderinputcomponent-inputprops-types-of-property-onchange-are-i
  const renderInputComponent = (inputProps: InputProps<FoodItem>): React.ReactNode => {

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
      inputProps.onChange(event, { newValue: event.target.value, method: 'type' });
    };

    const submitHandler = (e:React.KeyboardEvent) => {
      if (e.key === 'Enter'){
        e.preventDefault();
        const currentVal = [...formikContext.values[field]];
        if (currentVal.find(e => e.value === inputProps.value) === undefined){
          // create food item object from user input
          let sugObj = {
            label: inputProps.value,
            value: inputProps.value,
            amount: "",
            amountMeasurement: {value: "grams", label: "g"},
            opinion: "neutral",
          }
          formikContext.setFieldValue(field, [...currentVal, sugObj]);
          // clear input field after option added to food list
          setVal("");
        }
      } 
    }
   return (
    <input 
      {...inputProps}
      onKeyPress={submitHandler}
      onChange={onChangeHandler}
    />
   )
  }

  return (

    <div className="FormField">
      <label className="FormLabel">
        {label}:
      </label>
      <div className="FormInputContainer FormInputContainerSub">
        <Autosuggest 
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={(v: FoodItem) => getSuggestionValue(v, formikContext, field)}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          renderInputComponent={renderInputComponent}
        />
        
      </div>
      {
          formikContext.values[field] .length > 0 &&
          <FoodList foodItems={formikContext.values[field]} fieldName={field}/>
        }
    </div>
  )
}

export { Autocomplete }