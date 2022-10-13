import { fireEvent, render, screen } from "@testing-library/react";
import foodList from "@api/food";
import Food from "@components/page-component/food/Food";

const MAP_FOOD_LIST_RAW = JSON.stringify(
  foodList.map((item) => {
    return {
      title: item.title,
    };
  })
);

describe("Display all Food component content", () => {
  it("should render empty result when food list is empty", () => {
    render(<Food food={[]} setFood={jest.fn()} />);
    const EmptyResult = screen.getByText("Empty Result");
    expect(EmptyResult).toBeInTheDocument();
  });
  it("should render food list when data has value", () => {
    render(<Food food={foodList} setFood={jest.fn()} />);
    const FoodList = screen.queryAllByTestId("food-card");
    expect(FoodList.length).toBe(foodList.length);
  });
  it("should sort the food list in descending order when sort is toggle", async () => {
    render(<Food food={foodList} setFood={jest.fn()} />);

    const SortBtn = screen.getByText("Sort ↑");
    fireEvent.click(SortBtn);

    const FoodList = screen.queryAllByTestId("food-card") as HTMLDivElement[];
    const mapSortedDescFoodItem = FoodList.map((item, index) => {
      const reg = foodList[index].title;
      return {
        title: item.innerHTML.match(new RegExp(reg, "g"))?.[0],
      };
    });

    expect(JSON.stringify(mapSortedDescFoodItem)).not.toBe(MAP_FOOD_LIST_RAW);
  });
  it("should sort the food list ascending order when sort is toggle", () => {
    render(<Food food={foodList} setFood={jest.fn()} />);
    const FoodList = screen.queryAllByTestId("food-card") as HTMLDivElement[];
    const SortBtn = screen.getByText("Sort ↑");

    /** 2 click on btn to sort in ascending order**/
    fireEvent.click(SortBtn);
    fireEvent.click(SortBtn);

    const mapSortedAscFoodItem = FoodList.map((item, index) => {
      const reg = foodList[index].title;
      return {
        title: item.innerHTML.match(new RegExp(reg, "g"))?.[0],
      };
    });
    expect(JSON.stringify(mapSortedAscFoodItem)).not.toBe(MAP_FOOD_LIST_RAW);
  });
});
