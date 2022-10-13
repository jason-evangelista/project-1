import Home from "@pages/index";
import { render, screen } from "@testing-library/react";

describe("Check Home", () => {
  it("should load blog and my name heading", () => {
    render(<Home getPosts={[]} />);
    const BlogHeading = screen.getByText(/blog/i);
    const MyName = screen.getByText(/jason evangelista/i);
    expect(BlogHeading).toBeInTheDocument();
    expect(MyName).toBeInTheDocument();
  });
});
