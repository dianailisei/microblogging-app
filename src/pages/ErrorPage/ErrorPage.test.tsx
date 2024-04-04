import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import ErrorPage from "./ErrorPage";

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

describe("Error page",  () => {
  it("should render Error page correctly", () => {
    render(<ErrorPage />);
    const element = screen.getByTestId("error-page");
    expect(element).toBeInTheDocument();
  });
});
