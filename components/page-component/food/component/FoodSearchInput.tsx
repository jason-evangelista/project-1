import { Dispatch, FC, FormEvent, SetStateAction } from "react";
import style from "../../../../styles/food.module.css";
type Props = {
  handleSearchField: Dispatch<SetStateAction<string>>;
};
const FoodSearchInput: FC<Props> = (props) => {
  const { handleSearchField } = props;

  const handleOnInput = (e: FormEvent<HTMLInputElement>) =>
    handleSearchField(e.currentTarget.value);

  return (
    <div className={style.foodSearchFieldContainer}>
      <input
        className={style.foodSearchField}
        type="text"
        placeholder="Search my Favorite Food"
        onInput={(e) => handleOnInput(e)}
      />
    </div>
  );
};

export default FoodSearchInput;
