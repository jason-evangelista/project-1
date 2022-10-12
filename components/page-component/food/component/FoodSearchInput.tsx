import { FC, FormEvent, memo } from "react";
import style from "../../../../styles/food.module.css";
type Props = {
  handleSearchField: (e: FormEvent<HTMLInputElement>) => void;
};
const FoodSearchInput: FC<Props> = (props) => {
  const { handleSearchField } = props;

  return (
    <div className={style.foodSearchFieldContainer}>
      <input
        className={style.foodSearchField}
        type="text"
        placeholder="Search my Favorite Food"
        onInput={(e) => handleSearchField(e)}
      />
    </div>
  );
};

export default memo(FoodSearchInput);
