import { Food, UserProfile } from "@prisma/client";

type FoodListType = Food & {
  User: Pick<UserProfile, "name">;
};

export default FoodListType;
