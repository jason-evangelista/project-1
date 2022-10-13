import { fireEvent, render, screen } from "@testing-library/react";
import FoodForm from "@components/page-component/food/component/FoodForm";

import foodList from "@api/food";
import { act } from "react-dom/test-utils";

const [MOCK_DATA] = foodList;

const mockAddNewFood = jest.fn();
const mockCloseFormModal = jest.fn();

describe("Display all food form field", () => {
  beforeEach(() => {
    render(
      <FoodForm
        handleToggleModalForm={mockCloseFormModal}
        handleAddNewFood={mockAddNewFood}
      />
    );
  });
  it("should display food title input", () => {
    const TitleFieldLabel = screen.getByLabelText("Title");
    const TitleFieldInput = screen.getByPlaceholderText("Enter the food title");
    expect(TitleFieldLabel).toBeInTheDocument();
    expect(TitleFieldInput).toBeInTheDocument();
  });
  it("should display food image url input", () => {
    const ImageUrlLabel = screen.getByLabelText("Image URL");
    const ImageUrlField = screen.getByPlaceholderText("Enter food image url");
    expect(ImageUrlLabel).toBeInTheDocument();
    expect(ImageUrlField).toBeInTheDocument();
  });
  it("should display food description input", () => {
    const DescriptionLabel = screen.getByLabelText("Food Description");
    const DescriptionField = screen.getByPlaceholderText(
      "Enter food description"
    );
    expect(DescriptionLabel).toBeInTheDocument();
    expect(DescriptionField).toBeInTheDocument();
  });
  it("should display food rate input", () => {
    const RateLabel = screen.getByLabelText("Rate");
    const RateField = screen.getByPlaceholderText("Enter food rate");
    expect(RateLabel).toBeInTheDocument();
    expect(RateField).toBeInTheDocument();
  });
  it("should saved the food information in the list", async () => {
    const TitleField = screen.getByPlaceholderText("Enter the food title");
    const ImageUrlField = screen.getByPlaceholderText("Enter food image url");
    const DescriptionField = screen.getByPlaceholderText(
      "Enter food description"
    );
    const RateField = screen.getByPlaceholderText("Enter food rate");
    const AddFoodBtn = screen.getByRole("button");
    await act(async () => {
      fireEvent.input(TitleField, {
        target: {
          value: MOCK_DATA.title,
        },
      });
      fireEvent.input(ImageUrlField, {
        target: {
          value: MOCK_DATA.image,
        },
      });
      fireEvent.input(DescriptionField, {
        target: { value: MOCK_DATA.description },
      });
      fireEvent.input(RateField, { target: { value: MOCK_DATA.rate } });
      fireEvent.submit(AddFoodBtn);
    });
    expect(TitleField).toHaveValue(MOCK_DATA.title);
    expect(ImageUrlField).toHaveValue(MOCK_DATA.image);
    expect(DescriptionField).toHaveValue(MOCK_DATA.description);
    expect(RateField).toHaveValue(MOCK_DATA.rate);
    expect(mockAddNewFood).toHaveBeenCalled();
    expect(mockCloseFormModal).toHaveBeenCalled();
  });
  it("should render all error message when submitted empty form", async () => {
    const AddFoodBtn = screen.getByRole("button");
    await act(async () => {
      fireEvent.submit(AddFoodBtn);
    });
    const TitleError = screen.getByText("Food Title is required");
    const ImageError = screen.getByText("Food Image is required");
    const DescriptionError = screen.getByText("Food description is required");

    expect(TitleError).toBeInTheDocument();
    expect(ImageError).toBeInTheDocument();
    expect(DescriptionError).toBeInTheDocument();
  });
});
