import { ProductResponse } from "./product.inteface";
import qs from "qs";
import { fetcher } from "@/shared.fetcher";

type SearchParams = {
  /** Product limit, defaults to 10 */
  limit?: number;
  /** Text query */
  query: string;
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
  }: SearchParams): Promise<MeliResponse<ProductResponse>> {
    try {
      const result = await fetcher(
        this.base + "/search?" + qs.stringify({ limit, q })
      );

      return result;
    } catch (error) {
      // TODO: Add better fallback
      throw new Error("Unhandled Meli Error");
    }
  }
}

export const MeliService = {
  products: new ProductService(),
};
