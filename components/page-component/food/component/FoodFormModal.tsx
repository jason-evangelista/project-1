import { Dispatch, FC, SetStateAction } from "react";
import style from "@styles/food.module.css";
import utilStyle from "@styles/utils.module.css";
import FoodForm from "./FoodForm";
import { FoodInfo } from "@api/food";

type Props = {
  handleToggleFormModal: () => void;
  toggleModal: boolean;
  setFood: Dispatch<SetStateAction<FoodInfo[]>>;
  food: FoodInfo[];
};

const FoodFormModal: FC<Props> = (props) => {
  const { toggleModal, handleToggleFormModal, setFood, food } = props;

  if (!toggleModal) return null;

  return (
    <div className={style.foodFormModal}>
      <div className={style.foodFormContainer}>
        <div className={utilStyle.flexBetween}>
          <h3>Add your favorite food</h3>
          <button onClick={handleToggleFormModal}>Close</button>
        </div>
        <hr />
        <div>
          <FoodForm
            setFood={setFood}
            food={food}
            handleToggleModalForm={handleToggleFormModal}
          />
        </div>
      </div>
    </div>
  );
};

export default FoodFormModal;
