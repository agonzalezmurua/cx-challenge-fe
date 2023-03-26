import { render } from "@testing-library/react";
import { PriceFilter } from "./PriceFilter.component";

it("should be defined", () => {
  expect(PriceFilter).toBeDefined();
});

it("should render and match snapshot", () => {
  const result = render(<PriceFilter />);

  expect(result.asFragment()).toMatchSnapshot();
});
