import { HomePage } from "@/components/pages/Home.page";
import type { SearchFilters } from "@/models/PriceFilter.model";
import type { Product } from "@/models/Product.model";
import type { SearchSort } from "@/models/SearchSort.model";
import { fetcher } from "@/shared.fetcher";
import { GlobalContextProvider } from "global.context";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import qs from "qs";
import { SWRConfig } from "swr";
import type { GetProductsResult } from "./api/products";

type HomeProps = {
  products: Product[];
  available_sorts: SearchSort[];
  available_filters: SearchFilters[];
  sort: SearchSort;
  filters: SearchFilters[];
  fallback: {
    [path: string]: GetProductsResult;
  };
};

export default function Home({
  fallback,
  products,
  sort,
  filters,
  available_sorts,
  available_filters,
}: HomeProps) {
  const { query } = useRouter();

  return (
    <>
      <SWRConfig
        value={{
          fetcher,
          fallback,
        }}
      >
        <GlobalContextProvider
          initialValues={{
            query: {
              search: query.search,
              sort: sort,
              filters: filters?.map((f) => ({
                id: f.id,
                value: f.values[0].id,
              })),
            },
            products: products,
            parameters: {
              sorts: available_sorts,
              filters: available_filters,
            },
          }}
        >
          <HomePage />
        </GlobalContextProvider>
      </SWRConfig>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const path = "/api/products?" + qs.stringify(context.query);
  const result = await fetcher<GetProductsResult>(
    new URL(path, process.env.APP_HOST).toString()
  );

  return {
    props: {
      products: result.products,
      available_sorts: result.available_sorts,
      available_filters: result.available_filters,
      sort: result.sort ?? null,
      filters: result.filters,
      fallback: {
        [path]: result,
      },
      ...(await serverSideTranslations(context.locale!, ["common", "home"])),
    },
  };
}
