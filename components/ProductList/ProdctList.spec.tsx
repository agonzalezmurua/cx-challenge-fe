import { render } from "@/test-utilts";
import { ProductList } from "./ProductList.component";

it("should be defined", () => {
  expect(ProductList).toBeDefined();
});

it("should render and match snapshot", async () => {
  const updateQuery = jest.fn();
  const result = render(<ProductList />);

  expect(result.asFragment()).toMatchSnapshot();
});
