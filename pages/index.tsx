import { Fragment } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';

const Main = styled.main`
  position: absolute;
  top: 3em;
  width: 100%;
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Section = styled.section`
  scroll-margin-top: 3em;
  padding: 2em;
  width: 100%;
  height: 100vh;
  &:nth-child(2n+1){
    background-color: #D3411F;
  }
`;

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Container>
          <Section id="home">Home</Section>
          <Section id="menu">Menu</Section>
          <Section id="contact">Contact</Section>
        </Container>
      </Main>
    </Fragment>
  )
};

export default Home;
