import { render, screen } from "@testing-library/react";
import FoodCard from "@components/page-component/food/component/FoodCard";
import foodList from "@api/food";

const [MOCK_DATA] = foodList;

describe("Display Food card components", () => {
  it("should render all necessary components", () => {
    render(<FoodCard {...MOCK_DATA} handleShowImage={jest.fn()} />);
    const FoodImage = screen.getByRole("img");
    const FoodDescription = screen.getByText(MOCK_DATA.description);
    const FoodRate = screen.getByText(`Rate ${MOCK_DATA.rate} of 5`);

    expect(FoodImage).toBeInTheDocument();
    expect(FoodDescription).toBeInTheDocument();
    expect(FoodRate).toBeInTheDocument();
  });
});
