type Location = {
  id: string;
  name: string;
};

export interface ProductResponse {
  id: string;
  title: string;
  condition: string;
  thumbnail_id: string;
  catalog_product_id: unknown | null;
  listing_type_id: string;
  permalink: string;
  buying_mode: string;
  site_id: string;
  category_id: string;
  domain_id: string;
  thumbnail: string;
  currency_id: string;
  order_backend: number;
  price: number;
  original_price: number | null;
  sale_price: number | null;
  sold_quantity: number;
  available_quantity: number;
  official_store_id: number;
  official_store_name: string;
  use_thumbnail_id: boolean;
  accepts_mercadopago: boolean;
  tags: string[];
  shipping: {
    logistic_type: string;
    mode: string;
    store_pick_up: boolean;
    free_shipping: boolean;
    tags: string[];
  };
  stop_time: string;
  seller: {
    id: number;
    nickname: string;
    car_dealer: boolean;
    real_estate_agency: boolean;
    _: boolean;
    registration_date: string;
    tags: string[];
    car_dealer_logo: string;
    permalink: string;
    seller_reputation: {
      level_id: string;
      power_seller_status: string;
      transactions: {
        cancelled: number;
        completed: number;
        period: "string";
        ratings: {
          negative: number;
          neutral: number;
          positive: number;
        };
        total: number;
      };
      metrics: {
        sales: {
          period: string;
          completed: number;
        };
        claims: {
          period: string;
          rate: number;
          value: number;
        };
        delayed_handling_time: {
          period: string;
          rate: number;
          value: number;
        };
        cancellations: {
          period: string;
          rate: number;
          value: number;
        };
        eshop: {
          eshop_id: number;
          seller: number;
          nick_name: string;
          eshop_status_id: number;
          site_id: string;
          eshop_experience: number;
          eshop_rubro: string | null;
          eshop_locations: unknown[];
          eshop_logo_url: string;
        };
      };
    };
  };
  seller_address: {
    comment: string;
    address_line: string;
    zip_code: string;
    id: string | null;
    latitude: number | null;
    longitude: number | null;
    country: Location;
    state: Location;
    city: Location;
  };
  address: {
    state_id: string;
    state_name: string;
    city_id: string;
    city_name: string;
  };
  attributes: Array<{
    id: string;
    name: string;
    value_id: string | null;
    value_name: string;
    attribute_group_id: string;
    attribute_group_name: string;
    value_struct: unknown | null;
    values: [
      {
        id: null;
        name: string;
        struct: null;
        source: number;
      }
    ];
    source: number;
    value_type: string;
  }>;
  installments: {
    quantity: number;
    amount: number;
    rate: number;
    currency_id: string;
  };
  winner_item_id: unknown | null;
  discounts: unknown | null;
  promotions: unknown[];
  inventory_id: unknown | null;
}
