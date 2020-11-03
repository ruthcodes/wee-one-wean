import Head from 'next/head'
import Page from '../components/shared/Page'

export default function Stats() {
  return (
    <div>
      <Head>
        <title>W.O.W: Stats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <div className="Stats">
          Stats
        </div>
      </Page>
    </div>
  )
}
