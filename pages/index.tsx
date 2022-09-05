import { Fragment } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components'
import Header from '../components/Header'

const Main = styled.main`
  width: 100%;
  background-color: #e0561f;
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Section = styled.section`
  padding: 4em;
  width: 100%;
  height: 100vh;
`;

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Header />
        <Container>
          <Section id="home">Home</Section>
          <Section id="menu">Menu</Section>
          <Section id="contact">Contact</Section>
        </Container>
      </Main>
    </Fragment>
  )
}

export default Home
