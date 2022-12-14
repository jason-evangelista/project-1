import { FC } from "react";
import { useForm } from "react-hook-form";
import { FoodInfo } from "@api/food";

import style from "@styles/utils.module.css";
import FormGroup from "@components/FormGroup";
import Notify from "@api/notify";

type Props = {
  handleToggleModalForm: () => void;
  handleAddNewFood: (data: FoodInfo) => void;
};

type FormField = FoodInfo;

const formFieldDefaultValue: FormField = {
  title: "",
  image: "",
  description: "",
  rate: 0,
};

const FoodForm: FC<Props> = (props) => {
  const { handleToggleModalForm, handleAddNewFood } = props;
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
  } = useForm<FormField>({
    defaultValues: formFieldDefaultValue,
  });

  const titleField = register("title", { required: "Food Title is required" });
  const imageUrlField = register("image", {
    required: "Food Image is required ",
  });
  const descriptionField = register("description", {
    required: "Food description is required",
  });

  const rateField = register("rate", { required: "Food rate is required" });

  const onFoodSubmit = () => {
    const data = getValues();
    handleAddNewFood(data);
    Notify("Food Added", null, "success");
    handleToggleModalForm();
  };

  return (
    <form onSubmit={handleSubmit(onFoodSubmit)}>
      <FormGroup
        id={titleField.name}
        formLabel="Title"
        placeholder="Enter the food title"
        type="text"
        name={titleField.name}
        ref={titleField.ref}
        onChange={titleField.onChange}
        errorMessage={errors.title?.message}
      />
      <FormGroup
        id={imageUrlField.name}
        formLabel="Image URL"
        placeholder="Enter food image url"
        type="text"
        name={imageUrlField.name}
        ref={imageUrlField.ref}
        onChange={imageUrlField.onChange}
        errorMessage={errors.image?.message}
      />
      <div>
        <label htmlFor={descriptionField.name}>Food Description</label>
        <textarea
          id={descriptionField.name}
          placeholder="Enter food description"
          className={style.formGroupTextArea}
          rows={5}
          name={descriptionField.name}
          ref={descriptionField.ref}
          onChange={descriptionField.onChange}
        ></textarea>
        {errors.description?.message && (
          <p className={style.errorMessage}>{errors.description?.message}</p>
        )}
      </div>
      <FormGroup
        id={rateField.name}
        formLabel="Rate"
        type="number"
        placeholder="Enter food rate"
        max={5}
        min={0}
        name={rateField.name}
        ref={rateField.ref}
        onChange={rateField.onChange}
        errorMessage={errors.rate?.message}
      />
      <button
        type="submit"
        className={style.formGroupBtn}
        disabled={isSubmitting ? true : false}
      >
        {isSubmitting ? "Loading..." : "Add food"}
      </button>
    </form>
  );
};

export default FoodForm;
