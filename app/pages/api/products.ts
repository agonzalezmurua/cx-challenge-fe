// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { Product } from "@/models/Product.model";
import type { SearchSort } from "@/models/SearchSort.model";
import { MeliService } from "@/services/meli/meli.service";
import type { NextApiRequest, NextApiResponse } from "next";

export type GetProductsResult = {
  products: Product[];
  sort?: SearchSort;
  available_sorts: SearchSort[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetProductsResult>
) {
  const response = await MeliService.products.search({
    query: String(req.query.search),
    sort: String(req.query.sort),
  });

  if (!response) {
    return res
      .status(200)
      .json({ available_sorts: [], products: [], sort: undefined });
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

  res.status(200).json({
    products,
    available_sorts: response.available_sorts,
    sort: response.sort,
  });
}
