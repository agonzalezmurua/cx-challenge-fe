import { render } from "@testing-library/react";
import { Header } from "./Header.component";

it("should be defined", () => {
  expect(Header).toBeDefined();
});

it("should render and match snapshot", () => {
  const result = render(<Header />);

  expect(result.asFragment()).toMatchSnapshot();
});
