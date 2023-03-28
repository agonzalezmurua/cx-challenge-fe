import { NoResults } from "./NoResults.component";
import { render } from "@/test-utilts";

it("should be defined", () => {
  expect(NoResults).toBeDefined();
});

it("should render and match snapshot", () => {
  const result = render(<NoResults />);

  expect(result.asFragment()).toMatchSnapshot();
});
