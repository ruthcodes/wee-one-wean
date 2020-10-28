import Head from 'next/head'
import Page from '../components/shared/Page'
import Header from '../components/shared/Header'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Wee One Wean</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <div className="Index">
          <Header/>
          <p>Home</p>
        </div>
      </Page>

    </div>
  )
}
