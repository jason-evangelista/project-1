import { Food, User } from "@prisma/client";

type FoodListType = Food & {
  User: Pick<User, "user_name">;
};

export default FoodListType;
