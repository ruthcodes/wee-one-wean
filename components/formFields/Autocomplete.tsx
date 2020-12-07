import { useFormikContext } from 'formik';
import { useState } from 'react';
import Autosuggest from 'react-autosuggest';

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
const getSuggestionValue = (suggestion: Suggestion) => suggestion.value;

const renderSuggestion = (suggestion: Suggestion) => (
  <div>{suggestion.label}</div>
)

const Autocomplete = ({
  field,
  label
}: AutocompleteProps) => {
  const formikContext = useFormikContext();

  const [suggestions, setSuggestions] = useState<Suggestion[]>([])

  const handleChange = (e: React.SyntheticEvent, { newValue }: {newValue: string}) => {
    formikContext.setFieldValue((field as any), newValue)
  }

  // update suggestions list
  const onSuggestionsFetchRequested = ({
    value
  }: Suggestion) => {
    setSuggestions(getSuggestions(value))
  }

  const onSuggestionsClearRequested = () => setSuggestions([])

  const inputProps = {
    value: formikContext.values[field],
    onChange: handleChange
  }
  return (

    <div className="FormField">
      <label className="FormLabel">
        {label}:
      </label>
      <div className="FormInputContainer">
        <Autosuggest 
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    </div>
  )
}

export { Autocomplete }