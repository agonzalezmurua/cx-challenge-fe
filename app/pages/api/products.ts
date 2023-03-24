// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Product } from "@/models/Product";
import { MeliService } from "@/services/meli/meli.service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  const { results } = await MeliService.products.search({
    query: String(req.query.search),
  });

  const products: Product[] = results.map((r) => ({
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

  res.status(200).json(products);
}
