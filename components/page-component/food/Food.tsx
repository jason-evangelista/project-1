import {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import Layout from "@components/Layout";
import { FoodInfo } from "@api/food";
import FoodCard from "./component/FoodCard";
import FoodSearchInput from "./component/FoodSearchInput";
import utilStyle from "@styles/utils.module.css";
import style from "@styles/food.module.css";
import FoodSorterButton from "./component/FoodSorterButton";
import FoodImageContainer from "./component/FoodImageContainer";
import FoodFormModal from "./component/FoodFormModal";

export type ShowImageProps = {
  title: string;
  imageSrc: string;
};

type Props = {
  food: FoodInfo[];
  setFood: Dispatch<SetStateAction<FoodInfo[]>>;
};

const Food: FC<Props> = (props) => {
  const { food, setFood } = props;
  const [toggleSort, setToggleSort] = useState(true);
  const [showImage, setShowImage] = useState<ShowImageProps>({
    imageSrc: "",
    title: "",
  });
  const [renderedFoodList, setRenderedFoodList] = useState<FoodInfo[]>([]);

  const [toggleModal, setToggleModal] = useState(false);

  const handleSearchFoodFilter = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;

      const result = food.filter((item) =>
        item.title.match(new RegExp(value, "i"))
      );
      setRenderedFoodList(result);
    },
    [food]
  );

  const handleSetShowImage = (params: ShowImageProps) => {
    setShowImage(params);
  };

  const handleImageClose = () => {
    setShowImage({ imageSrc: "", title: "" });
  };

  const handleFoodListSort = () => {
    const sortedFoodList: FoodInfo[] = [];
    if (!toggleSort) {
      const result = food.sort((item1, item2) => item1.rate - item2.rate);
      sortedFoodList.push(...result);
    } else {
      const result = food.sort((item1, item2) => item2.rate - item1.rate);
      sortedFoodList.push(...result);
    }
    setRenderedFoodList(sortedFoodList);
    setToggleSort(!toggleSort);
  };

  const handleToggleModal = () => setToggleModal(!toggleModal);

  const handleAddNewFood = (data: FoodInfo) => {
    setFood([...food, { ...data }]);
  };

  const isEmptyResult = !food.length;

  useEffect(() => {
    setRenderedFoodList(food);
  }, [food]);
  return (
    <Layout home={false}>
      <FoodFormModal
        toggleModal={toggleModal}
        handleToggleFormModal={handleToggleModal}
        handleAddNewFood={handleAddNewFood}
      />
      <div className={style.foodListContainer}>
        <FoodSearchInput handleSearchField={handleSearchFoodFilter} />
        <div className={`${style.foodSorterContainer} ${utilStyle["my-2"]}`}>
          <button onClick={handleToggleModal}>Add Food</button>
          <FoodSorterButton
            handleSortFoodList={handleFoodListSort}
            toggle={toggleSort}
          />
        </div>
        {isEmptyResult ? (
          <h1 className={utilStyle.textCenter}>Empty Result</h1>
        ) : (
          <>
            {showImage.imageSrc && (
              <FoodImageContainer
                {...showImage}
                handleCloseImage={handleImageClose}
              />
            )}

            {renderedFoodList.map((item) => (
              <FoodCard
                {...item}
                key={item.title}
                handleShowImage={handleSetShowImage}
              />
            ))}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Food;
