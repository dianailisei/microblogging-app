import "@testing-library/jest-dom";
import {screen } from "@testing-library/react";
import Login from "./Login";
import { render } from "../../tests/test-utils";

const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
}));

describe("Login page", () => {
  it("should render Login page correctly", () => {
    render(<Login />);
    const element = screen.getByTestId("login-page");
    expect(element).toBeInTheDocument();
  });
});
