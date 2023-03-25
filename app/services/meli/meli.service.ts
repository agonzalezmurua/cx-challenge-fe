import { fetcher } from "@/shared.fetcher";
import logger from "consola";
import qs from "qs";
import type { ProductResponse } from "./interfaces";

type ProductSearchParams = {
  /** Product limit, defaults to 10 */
  limit?: number;
  /** Text query */
  query: string;
  sort?: string;
  price?: string;
};

type Filter = {
  id: string;
  name: string;
  type: string;
  values: Array<{
    id: string;
    name: string;
    results: number;
  }>;
};

type Sort = {
  id: string;
  name: string;
};

type MeliResponse<T = any> = {
  site_id: string;
  country_default_time_zone: string;
  query: string;
  paging: {
    total: number;
    primary_results: number;
    offset: number;
    limit: number;
  };
  results: Array<T>;
  sort: Sort;
  available_sorts: Array<Sort>;
  filters: Array<Filter>;
  available_filters: Array<Filter>;
};

class ProductService {
  constructor(private base = process.env.MELI_API_URL + "/sites/MLA") {}

  /**
   * Perform a generic product search
   * @param param0
   * @returns
   */
  public async search({
    limit = 10,
    query: q,
    sort = undefined,
    price = undefined,
  }: ProductSearchParams): Promise<MeliResponse<ProductResponse> | undefined> {
    try {
      const result = await fetcher(
        this.base + "/search?" + qs.stringify({ limit, q, sort, price })
      );

      return result;
    } catch (error) {
      logger.error("Meli error:", error);
      return undefined;
    }
  }
}

export const MeliService = {
  products: new ProductService(),
};
