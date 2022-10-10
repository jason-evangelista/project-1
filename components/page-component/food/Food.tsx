import { FC } from "react";
import Layout from "../../Layout";
import foodList from "../../../api/food";
import FoodCard from "./component/FoodCard";

const Food: FC = () => {
  return (
    <Layout home={false}>
      <div>
        {foodList.map((item) => (
          <FoodCard {...item} key={item.title} />
        ))}
      </div>
    </Layout>
  );
};

export default Food;
