import { render } from "@/test-utilts";
import { Content } from "./Content.component";

it("should be defined", () => {
  expect(Content).toBeDefined();
});

it("should render and match snapshot", () => {
  const result = render(
    <Content>
      <section>First</section>
      <section>Second</section>
      <section>Third</section>
    </Content>
  );

  expect(result.asFragment()).toMatchSnapshot();
  expect(result.getByText("First")).toBeInTheDocument();
  expect(result.getByText("Second")).toBeInTheDocument();
  expect(result.getByText("Third")).toBeInTheDocument();
});
