import { render, waitFor } from "@testing-library/react";
import { SortFilter } from "./SortFilter.component";
import userEvent from "@testing-library/user-event";

it("should be defined", () => {
  expect(SortFilter).toBeDefined();
});

it.failing("should render and match snapshot", async () => {
  const updateQuery = jest.fn();
  const result = render(<SortFilter />);

  expect(result.asFragment()).toMatchSnapshot();
  const trigger = result.getByTestId("sort_trigger");
  const option = result.getByText("Second item");

  expect(trigger).toBeInTheDocument();
  expect(option).toBeInTheDocument();
  expect(option).not.toBeVisible();

  // Open the menu
  userEvent.click(trigger);

  // Display options
  await waitFor(() => expect(option).toBeVisible());

  // Close menu by clicking the first option
  userEvent.click(option);
  await waitFor(() => expect(updateQuery).toHaveBeenCalled());
});
