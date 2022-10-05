import { Fragment, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { Main, Container } from '../components/styles/PageStyleComponents';
import MenuList from '../components/MenuList';
import Menu from '../models/menu';
import { Document } from 'mongoose';
import serializeId from '../lib/serializeId';
import dbConnect from '../lib/dbConnect';

const Section = styled.section`
  scroll-margin-top: 3em;
  padding: 2em;
  width: 100%;
  height: 100vh;
  &:nth-child(2n+1){
    background-color: #D3411F;
  }
`;
export interface IBriefMenu {
  _id: string,
  image: string
}
const Home: NextPage<{ menuList: IBriefMenu[] }> = ({ menuList }) => {
  return (
    <Fragment>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Container>
          <Section id="home">Home</Section>
          <Section id="menu"><MenuList menuList={menuList} /></Section>
          <Section id="contact">Contact</Section>
        </Container>
      </Main>
    </Fragment>
  )
};
export async function getStaticProps() {
  await dbConnect();
  const data: Document[] = await Menu.find({}).select("_id, image");
  const menuList = serializeId(data);
  return {
    props: {
      menuList
    }
  }
}
export default Home;
