import { useFormikContext, FormikContextType, FormikValues, setNestedObjectValues } from 'formik';
import { useState, useRef, MutableRefObject, useEffect } from 'react';
import Autosuggest, { InputProps, SuggestionsFetchRequestedParams } from 'react-autosuggest';
import FoodList, { FoodItem } from './FoodList';
import { useDispatch, useStore } from '../../pages/_app';

interface AutocompleteProps {
  field: string;
  label: string;
}

interface Suggestion {
  label: string;
  value: string;
}

// this will come from API
const suggestions: Suggestion[] = [
  {
    label: "Sweet potato",
    value: "sweet potato"
  },
  {
    label: "Carrot",
    value: "carrot"
  },
  {
    label: "Squash",
    value: "squash"
  },
  {
    label: "Potato",
    value: "potato"
  },
]

const getSuggestions = function (userInput: string): Suggestion[] {
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
  suggestion: Suggestion,
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

const renderSuggestion = (suggestion: Suggestion) => (
  <div>{suggestion.label}</div>
)

const Autocomplete = ({
  field,
  label
}: AutocompleteProps) => {
  const formikContext = useFormikContext();
  
  const [val, setVal] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])

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

  const inputProps: InputProps<Suggestion> = {
    value: val,
    onChange: handleChange,
  }

  // custom onChangeHandler due to issue with @types
  // https://stackoverflow.com/questions/61785523/autosuggest-renderinputcomponent-inputprops-types-of-property-onchange-are-i
  const renderInputComponent = (inputProps: InputProps<Suggestion>): React.ReactNode => {

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
      inputProps.onChange(event, { newValue: event.target.value, method: 'type' });
    };

    const submitHandler = (e:React.KeyboardEvent) => {
      if (e.key === 'Enter'){
        e.preventDefault();
        const currentVal = [...formikContext.values[field]];
        if (currentVal.find(e => e.value === inputProps.value) === undefined){
          // create suggestion object from user input
          let sugObj = {
            label: inputProps.value,
            value: inputProps.value,
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
          getSuggestionValue={(v: Suggestion) => getSuggestionValue(v, formikContext, field)}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          renderInputComponent={renderInputComponent}
        />
        {
          formikContext.values[field] &&
          <FoodList foodItems={formikContext.values[field]} fieldName={field}/>
        }
      </div>
    </div>
  )
}

export { Autocomplete }