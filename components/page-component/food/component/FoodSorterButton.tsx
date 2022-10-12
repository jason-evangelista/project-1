import { FC, memo } from "react";

type Props = {
  handleSortFoodList: () => void;
  toggle: boolean;
};

const FoodSorterButton: FC<Props> = (props) => {
  const { handleSortFoodList, toggle } = props;
  return (
    <button onClick={handleSortFoodList}>Sort {toggle ? "↑" : "↓"}</button>
  );
};

export default memo(FoodSorterButton);
