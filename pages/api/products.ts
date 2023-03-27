// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { Product } from "@/models/Product.model";
import { SearchFilters } from "@/models/PriceFilter.model";
import type { SearchSort } from "@/models/SearchSort.model";
import { MeliService } from "@/services/meli/meli.service";
import type { NextApiRequest, NextApiResponse } from "next";

type SimplifiedFilterValue = string;

const knownFilterNames = ["price"];

export type GetProductQuery = {
  search?: string;
  sort?: SearchSort;
  price?: SimplifiedFilterValue;
};

export type GetProductsResult = {
  products: Product[];
  available_sorts: SearchSort[];
  available_filters: SearchFilters[];
  /** Query applied to the search */
  query: GetProductQuery;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetProductsResult>
) {
  const { query } = req;
  const params = {
    search: (query.search && String(query.search)) || "",
    sort: (query.sort && String(query.sort)) || null,
    price: (query.price && String(query.price)) || null,
  };

  const response = await MeliService.products.search(params);

  if (!response) {
    return res.status(200).json({
      available_sorts: [],
      products: [],
      available_filters: [],
      query: {
        search: params.search,
      },
    });
  }

  const products: Product[] = response.results.map((r) => ({
    id: r.id,
    title: r.title,
    price: {
      amount: r.price.toString().split(".")[0],
      currency: r.currency_id,
      decimals: Number(r.price.toString().split(".")[1] ?? "0"),
    },
    installments: {
      amount: String(r.installments.amount),
      quantity: r.installments.quantity,
    },
    address: {
      city_name: r.address.city_name,
      state_name: r.address.state_name,
    },
    condition: r.condition,
    free_shipping: r.shipping.free_shipping,
    picture: r.thumbnail,
  }));

  const filters: Record<string, SimplifiedFilterValue> = Object.fromEntries(
    Object.values(response.filters)
      .filter((e) => knownFilterNames.includes(e.id))
      .map((e) => [e.id, e.values[0].id])
  );

  res.status(200).json({
    products,
    available_sorts: response.available_sorts,
    available_filters: response.available_filters,
    query: {
      search: response.query,
      sort: response.sort,
      ...filters,
    },
  });
}
