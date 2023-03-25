import { HomePage } from "@/components/pages/Home.page";
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
  sort: SearchSort;
  fallback: {
    [path: string]: GetProductsResult;
  };
};

export default function Home({
  fallback,
  products,
  sort,
  available_sorts,
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
            },
            products: products,
            parameters: {
              sorts: available_sorts,
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
      sort: result.sort,
      fallback: {
        [path]: result,
      },
      ...(await serverSideTranslations(context.locale!, ["common", "home"])),
    },
  };
}
