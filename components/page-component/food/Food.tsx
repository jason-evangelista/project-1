import { FC, FormEvent, useCallback, useState } from "react";
import Layout from "../../Layout";
import foodList, { FoodInfo } from "../../../api/food";
import FoodCard from "./component/FoodCard";
import FoodSearchInput from "./component/FoodSearchInput";
import utilStyle from "../../../styles/utils.module.css";
import style from "../../../styles/food.module.css";
import FoodSorterButton from "./component/FoodSorterButton";

const Food: FC = () => {
  const [food, setFood] = useState<FoodInfo[]>(foodList);
  const [toggleSort, setToggleSort] = useState(true);

  const handleSearchFoodFilter = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;

      if (!value) return setFood(foodList);

      const result = food.filter((item) =>
        item.title.match(new RegExp(value, "i"))
      );
      setFood(result);
      return result;
    },
    [food]
  );

  const handleFoodListSort = useCallback(() => {
    const sortedFoodList: FoodInfo[] = [];
    if (!toggleSort) {
      const result = food.sort((item1, item2) => item1.rate - item2.rate);
      sortedFoodList.push(...result);
    } else {
      const result = food.sort((item1, item2) => item2.rate - item1.rate);
      sortedFoodList.push(...result);
    }
    setFood(sortedFoodList);
    setToggleSort(!toggleSort);
  }, [food, toggleSort]);

  const isEmptyResult = !food.length;

  return (
    <Layout home={false}>
      <div className={style.foodListContainer}>
        <FoodSearchInput handleSearchField={handleSearchFoodFilter} />
        <div className={`${style.foodSorterContainer} ${utilStyle["my-2"]}`}>
          <FoodSorterButton
            handleSortFoodList={handleFoodListSort}
            toggle={toggleSort}
          />
        </div>
        {isEmptyResult ? (
          <h1 className={utilStyle.textCenter}>Empty Result</h1>
        ) : (
          <>
            {food.map((item) => (
              <FoodCard {...item} key={item.title} />
            ))}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Food;
