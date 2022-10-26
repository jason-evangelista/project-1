import { FC } from "react";
import { Center, Divider } from "@mantine/core";
import FoodList from "./components/FoodList";
import FoodListType from "./type/FoodListType";
type Props = {
  food: FoodListType[];
};

const Dashboard: FC<Props> = (props) => {
  const { food } = props;

  return (
    <>
      <Divider mb="xl" />
      <Center>
        <FoodList food={food} />
      </Center>
    </>
  );
};

export default Dashboard;
