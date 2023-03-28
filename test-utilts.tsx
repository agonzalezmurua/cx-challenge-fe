import { makeStore } from "@/redux/store";
import { queries, Queries } from "@testing-library/dom";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";

const store = makeStore({
  app: {
    parameters: {
      sorts: [
        {
          id: "irrelevant",
          name: "Menos relevante",
        },
      ],
      filters: [
        {
          id: "most_expensive",
          name: "Más caro",
          type: "price",
          values: [
            {
              id: "*-*",
              name: "infinito a infinito (infinito)",
              results: 10,
            },
          ],
        },
      ],
    },
    products: [
      {
        address: {
          city_name: "Caballito",
          state_name: "Capital Federal",
        },
        condition: "new",
        free_shipping: true,
        title: "Apple AirPods Con Estuche De Carga - Blanco",
        id: "MLA1363069275",
        installments: {
          amount: "6674.27",
          quantity: 6,
        },
        picture:
          "http://http2.mlstatic.com/D_923638-MLA54361048207_032023-I.jpg",
        price: {
          currency: "ARS",
          amount: "26994",
          decimals: 0,
        },
      },
    ],
    query: {
      price: "*-10000",
      search: "Apple Ipod",
      sort: { id: "relevance", name: "Más relevante" },
    },
  },
});

const AllTheProviders = ({ children }: { children: JSX.Element }) => {
  return <Provider store={store}>{children}</Provider>;
};

const customRender = <
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container
>(
  ui: React.ReactElement,
  options?: RenderOptions<Q, Container, BaseElement>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
