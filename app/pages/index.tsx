import { HomePage } from "@/components/pages/Home.page";
import { GlobalContextProvider } from "global.context";
import { Product } from "@/models/Product";
import { fetcher } from "@/shared.fetcher";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";
import qs from "qs";

type HomeProps = {
  products: Product[];
  fallback: any;
};

export default function Home({ fallback, products }: HomeProps) {
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
            products,
            query,
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
  const products = await fetcher(
    new URL(path, process.env.APP_HOST).toString()
  );

  return {
    props: {
      products,
      fallback: {
        [path]: products,
      },
      ...(await serverSideTranslations(context.locale!, ["common", "home"])),
    },
  };
}
