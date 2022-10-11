import { FC, useMemo, useState } from "react";
import Layout from "../../Layout";
import foodList, { FoodInfo } from "../../../api/food";
import FoodCard from "./component/FoodCard";
import FoodSearchInput from "./component/FoodSearchInput";
import utilStyle from "../../../styles/utils.module.css";

const Food: FC = () => {
  const [food] = useState<FoodInfo[]>(foodList);
  const [query, setSearchQuery] = useState("");

  const memoizedFoodList = useMemo(() => {
    const result = food.filter((item) =>
      item.title.match(new RegExp(query, "i"))
    );
    return result;
  }, [food, query]);

  const isEmptyResult = !memoizedFoodList.length;

  return (
    <Layout home={false}>
      <div>
        <FoodSearchInput handleSearchField={setSearchQuery} />
        {isEmptyResult ? (
          <h1 className={utilStyle.textCenter}>Empty Result</h1>
        ) : (
          <>
            {memoizedFoodList.map((item) => (
              <FoodCard {...item} key={item.title} />
            ))}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Food;
