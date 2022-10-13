import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import FoodImageContainer from "@components/page-component/food/component/FoodImageContainer";
import foodList from "@api/food";

const [MOCK_DATA] = foodList;
const mockedCloseBtn = jest.fn();

describe("Display all components", () => {
  it("should render all component", () => {
    render(
      <FoodImageContainer
        handleCloseImage={mockedCloseBtn}
        imageSrc={MOCK_DATA.image}
        title={MOCK_DATA.title}
      />
    );
    const ButtonClose = screen.getByText("Close");
    const ImageContainer = screen.getByRole("img");

    expect(ButtonClose).toBeInTheDocument();
    expect(ImageContainer).toBeInTheDocument();
  });
  it("should close the zoomed image when button was click", async () => {
    render(
      <FoodImageContainer
        handleCloseImage={mockedCloseBtn}
        imageSrc={MOCK_DATA.image}
        title={MOCK_DATA.title}
      />
    );
    const ButtonClose = screen.getByText("Close");

    fireEvent.click(ButtonClose);
    await waitFor(() => {
      expect(mockedCloseBtn).toHaveBeenCalled();
    });
  });
});
