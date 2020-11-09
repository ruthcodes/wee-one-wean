import React from "react";
import Head from 'next/head'
import Page from '../components/shared/Page'

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "./_app";
import { useRouter } from "next/router";
import { TextInput } from "../components/formFields/TextInput";
import { MealDetails } from "../reducers/mealReducer";

type Props = {}


const MealForm: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const validationSchema = Yup.object({
    date: Yup
      .string()
      .required("Please enter a date"),
    time: Yup
      .string()
      .required("Please enter a time"),
    meal: Yup
      .string()
      .required("Please choose a meal"),
    // food: Yup
    //   .array()
    //   .of(Yup.string()),
    food: Yup
      .string(),
    drink: Yup
      .string(),
    notes: Yup
      .string()
  })

  const initialValues: MealDetails = {
    date: "",
    time: "",
    meal: "",
    // food: [],
    food: "",
    drink: "",
    notes: ""
  }

  const handleSubmit = (
    payload: MealDetails
  ) => {

    dispatch({ type: "app/ADD_MEAL", payload: payload})
    router.push("/")
  }

  const fieldGenerator = function (mealDetailObj: MealDetails): string[] {
    let fields = []
    for (const field in mealDetailObj){
      fields.push(field)
    }
    return fields;
  }

  

  return (
    <div className="WidthPadding HeightPadding">
      <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({isSubmitting}) => (
            <Form className="Form">
              {
                fieldGenerator(initialValues).map((field: string, i: number) => (
                  <TextInput key={i} field={field} label={field} required/>
                ))
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
