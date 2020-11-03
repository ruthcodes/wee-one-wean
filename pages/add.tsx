import Head from 'next/head'
import Page from '../components/shared/Page'

export default function Add() {
  return (
    <div>
      <Head>
        <title>W.O.W: Input Meal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <div className="Add">
          Add
        </div>
      </Page>
    </div>
  )
}
