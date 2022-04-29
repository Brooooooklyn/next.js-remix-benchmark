import Head from 'next/head'
import Link from 'next/link'

export function getServerSideProps() {
  return {
    props: {},
  }
}

export default function IndexPage() {
  return (
    <div>
      <Head>
        <link rel="icon" href="https://reactjs.org/favicon.ico" />
      </Head>
      Hello World.{' '}
      <Link href="/about">
        <a>About</a>
      </Link>
    </div>
  )
}
