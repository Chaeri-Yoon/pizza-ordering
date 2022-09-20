import { Fragment } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import MenuList from '../components/MenuList';
import Menu, { IMenu } from '../models/menu';
import mongoose from 'mongoose';

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

const Home: NextPage<{ menuList: IMenu[] }> = ({ menuList }) => {
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
  await mongoose.connect(process.env.MONGODB_URL || '');
  const data = await Menu.find({});
  const menuList = data.map(menu => {
    let objectMenu = menu.toObject();
    objectMenu._id = objectMenu._id.toString();
    return objectMenu;
  });
  return {
    props: {
      menuList
    }
  }
}
export default Home;
