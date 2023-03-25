export interface Product {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: string;
    decimals: number;
  };
  installments: {
    quantity: number;
    amount: string;
  };
  address: {
    state_name: string;
    city_name: string;
  };
  picture: string;
  condition: string;
  free_shipping: boolean;
}
