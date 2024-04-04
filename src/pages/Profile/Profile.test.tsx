import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import Profile from "./Profile";
import { render } from "../../tests/test-utils";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
  useLocation: () => jest.fn(),
}));

describe("Login page", () => {
  it("renders loading text when isLoading is true", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
