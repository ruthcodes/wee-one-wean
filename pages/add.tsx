import React from "react";
import Head from 'next/head'
import Page from '../components/shared/Page'

import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import { useDispatch } from "./_app";
import { useRouter } from "next/router";
import { TextInput } from "../components/formFields/TextInput";
import { MealDetails } from "../reducers/mealReducer";
import { FormFieldObject } from "../components/types/forms";
import { DateInput } from "../components/formFields/DateInput";
import { DropdownInput } from "../components/formFields/DropdownInput";
import { CheckboxInput } from "../components/formFields/CheckboxInput";
import { guessedMeal } from "../helpers";

type Props = {}

const MealForm: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const validationSchema = Yup.object({
    date: Yup
      .date()
      .required("Please enter a date"),
    time: Yup
      .date()
      .required("Please enter a time"),
    meal: Yup
      .object()
      .shape({
        value: Yup.string(),
        label: Yup.string()
      })
      .required("Please choose a meal"),
    food: Yup
      .string()
      .required("Please enter a food"),
    drink: Yup
      .object()
      .shape({
        milk: Yup.boolean(),
        water: Yup.boolean()
      }),
    notes: Yup
      .string()
  })


  const initialValues: MealDetails = {
    date: new Date(),
    time: new Date(),
    meal: guessedMeal(new Date()),
    food: "",
    drink: {milk: false, water: false},
    notes: ""
  }

  

  const formFields: FormFieldObject[] = [
    {
      field: "date",
      label: "Date",
      type: "date",
      required: true
    },
    {
      field: "time",
      label: "Time",
      type: "time",
      required: true
    },
    {
      field: "meal",
      label: "Meal",
      type: "dropdown",
      options: [
        {value: "Breakfast", label: "Breakfast"}, 
        {value: "Lunch", label: "Lunch"},
        {value: "Dinner", label: "Dinner"},
        {value: "Snack", label: "Snack"},
      ],
      required: true
    },
    {
      field: "food",
      label: "Food",
      type: "text",
      required: false
    },
    {
      field: "drink",
      label: "Drink",
      type: "checkbox",
      options: [
        {value: "water", label: "Water"},
        {value: "milk", label: "Milk"},
      ],
      required: false
    },
    {
      field: "notes",
      label: "Notes",
      type: "textarea",
      required: false
    }
  ]

  const handleSubmit = (
    payload: MealDetails,
    {resetForm}: {resetForm: () => void}
  ) => {

    dispatch({ type: "app/ADD_MEAL", payload: payload})
    resetForm()
  }

  return (
    <div className="WidthPadding HeightPadding">
      <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({isSubmitting, values}) => (
            <Form className="Form">
              
              {
                formFields.map((field: FormFieldObject, i: number) => {
                  if (field.type === "text" || field.type === "textarea"){
                    return (
                      <TextInput
                        key={i} 
                        field={field.field} 
                        label={field.label} 
                        required={field.required}
                        type={field.type}
                       />
                    )
                  } else if (field.type === "dropdown") {
                    return (
                      <DropdownInput 
                        key={i} 
                        field={field.field} 
                        label={field.label} 
                        options={field.options} 
                        time={`${values.time}` || new Date().toString()}
                      />
                    )
                  } else if (field.type === "checkbox") {
                    return (
                      <CheckboxInput
                        key={i} 
                        field={field.field} 
                        label={field.label} 
                        options={field.options} 
                      />
                    )
                  } else {
                    return (
                      <DateInput 
                        key={i} 
                        field={field.field} 
                        label={field.label} 
                        time={field.type === "time" ? true : false} 
                      />
                    )
                  }
                })
              }
              <button
                className="BtnSubmit"
                type="submit"
                disabled={isSubmitting}
              >Add</button>
            </Form>
          )}
        </Formik>
    </div>
  )
}

export default function Add() {
  return (
    <div>
      <Head>
        <title>W.O.W: Input Meal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <div className="Add">
          <MealForm />
        </div>
      </Page>
    </div>
  )
}
