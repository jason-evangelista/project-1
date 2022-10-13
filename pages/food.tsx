import { FoodInfo } from "@api/food";
import { NextPage } from "next";
import { useState } from "react";

import Head from "next/head";
import Food from "@components/page-component/food/Food";

const FoodPage: NextPage = () => {
  const [food, setFood] = useState<FoodInfo[]>([]);

  return (
    <>
      <Head>
        <title>My Favorite Foods</title>
      </Head>
      <Food food={food} setFood={setFood} />
    </>
  );
};

export default FoodPage;
