import {
  TextInput,
  Textarea,
  Text,
  Container,
  Button,
  Checkbox,
} from "@mantine/core";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { FC } from "react";
import { useForm } from "react-hook-form";
import CreateFoodType from "./type/create-food";
import axios from "axios";
import Notify from "@api/notify";

const CreateFood: FC = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    getValues,
  } = useForm<CreateFoodType>();

  const titleField = register("title", { required: "Food title is required" });
  const descriptionField = register("description", {
    required: "Food Description is required",
  });

  const coverPhotoField = register("coverPhoto", {
    required: "Food cover photo is required",
  });
  const rateField = register("rate", { required: "Food rate is required" });
  const visibilityField = register("isPublic");

  const handleOnFoodSubmit = async () => {
    const { coverPhoto, ...rest } = getValues();
    const { data, error } = await supabase.functions.invoke("compress-image", {
      body: coverPhoto[0],
    });

    if (error)
      return Notify(
        "Error saving the cover photo, Please try again",
        null,
        "error"
      );

    await axios.post("/api/create-food", {
      ...rest,
      coverPhoto: data.data?.path,
    });
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(handleOnFoodSubmit)}>
      <TextInput
        ref={titleField.ref}
        name={titleField.name}
        onChange={titleField.onChange}
        label="Food title"
        placeholder="Food Title"
        mb="sm"
        error={errors.title?.message}
      />
      <Textarea
        ref={descriptionField.ref}
        name={descriptionField.name}
        onChange={descriptionField.onChange}
        placeholder="Food Description"
        mb="sm"
        label="Food Description"
        error={errors.description?.message}
      />
      <TextInput
        ref={coverPhotoField.ref}
        name={coverPhotoField.name}
        onChange={coverPhotoField.onChange}
        type="file"
        label="Food Cover Photo"
        placeholder="Food Cover Photo"
        mb="sm"
        accept="image/jpeg"
        error={errors.coverPhoto?.message}
      />
      <TextInput
        ref={rateField.ref}
        name={rateField.name}
        onChange={rateField.onChange}
        label="Food Rate"
        placeholder="Food Rate"
        type="number"
        max={5}
        min={0}
        mb="sm"
        error={errors.rate?.message}
      />
      <Container
        fluid
        sx={{ display: "flex", alignItems: "center", gap: 5 }}
        mb="md"
        px={0}
      >
        <Checkbox
          ref={visibilityField.ref}
          name={visibilityField.name}
          onChange={visibilityField.onChange}
        />
        <Text weight={600} size="sm">
          Make this Food Article Public
        </Text>
      </Container>
      <Button type="submit" loading={isSubmitting}>
        Save Food Article
      </Button>
    </form>
  );
};

export default CreateFood;
