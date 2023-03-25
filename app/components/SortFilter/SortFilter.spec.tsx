import { GlobalContext } from "@/global.context";
import { render, waitFor } from "@testing-library/react";
import { SortFilter } from "./SortFilter.component";
import userEvent from "@testing-library/user-event";

it("should be defined", () => {
  expect(SortFilter).toBeDefined();
});

it("should render and match snapshot", async () => {
  const updateQuery = jest.fn();
  const result = render(<SortFilter />, {
    wrapper: ({ children }) => (
      <GlobalContext.Provider
        value={{
          actions: {
            updateQuery: updateQuery,
            updateSearchResult: jest.fn(),
          },
          parameters: {
            sorts: [
              {
                id: "second_item",
                name: "Second item",
              },
            ],
          },
          products: [],
          query: {
            search: "",
            sort: { id: "first_item", name: "First item" },
          },
        }}
      >
        {children}
      </GlobalContext.Provider>
    ),
  });

  expect(result.asFragment()).toMatchSnapshot();
  const trigger = result.getByTestId("sort_filter");
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
