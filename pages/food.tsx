import { NextPage } from "next";
import Head from "next/head";
import Food from "../components/page-component/food/Food";

const FoodPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>My Favorite Foods</title>
      </Head>
      <Food />
    </>
  );
};

export default FoodPage;
