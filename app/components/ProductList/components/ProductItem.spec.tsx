import { Product } from "@/models/Product.model";
import { render } from "@testing-library/react";
import { ProductItem } from "./ProductItem.component";

const product: Product = {
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
  picture: "http://http2.mlstatic.com/D_923638-MLA54361048207_032023-I.jpg",
  price: {
    currency: "ARS",
    amount: "26994",
    decimals: 0,
  },
};

it("should be defined", () => {
  expect(ProductItem).toBeDefined();
});

it("should render and match snapshot", () => {
  const result = render(<ProductItem {...product} />);

  expect(result.asFragment()).toMatchSnapshot();
  expect(result.getByText(product.title)).toBeInTheDocument();
});
