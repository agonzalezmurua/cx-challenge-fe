import { render, waitFor } from "@/test-utilts";
import { SortFilter } from "./SortFilter.component";
import userEvent from "@testing-library/user-event";

it("should be defined", () => {
  expect(SortFilter).toBeDefined();
});

it("should render and match snapshot", async () => {
  const result = render(<SortFilter />);

  const snapshot1 = result.asFragment();
  expect(snapshot1).toMatchSnapshot();

  const trigger = result.getByTestId("sort_trigger");
  const option = result.getByText("Menos relevante");

  expect(trigger).toBeInTheDocument();
  expect(option).toBeInTheDocument();
  expect(option).not.toBeVisible();

  // Open the menu
  userEvent.click(trigger);

  // Display options
  await waitFor(() => expect(option).toBeVisible());

  // Close menu by clicking the first option
  userEvent.click(option);

  const snapshot2 = result.asFragment();
  expect(snapshot2).toMatchSnapshot();

  // Should have mutated  (see axios mock to identify the new state)
  expect(snapshot1).not.toEqual(snapshot2);
});
