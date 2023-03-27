import { Content } from "@/components/layout/Content";
import { Header } from "@/components/layout/Header";
import { PriceFilter } from "@/components/PriceFilter";
import { ProductList } from "@/components/ProductList";
import { SortFilter } from "@/components/SortFilter";
import { fetchProducts } from "@/redux/app.slice";
import { wrapper } from "@/redux/store";
import styles from "@/styles/Home.module.scss";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

export default function Home() {
  const { t } = useTranslation("home");

  return (
    <>
      <Head>
        <title>{t("page.title")}</title>
        <meta name="description" content={t("page.description")!} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Header />
      <main className={styles.main}>
        <Content>
          <section className={styles.sidebar}>
            <SortFilter />
            <PriceFilter />
          </section>
          <ProductList />
          <section></section>
        </Content>
      </main>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, locale }) => {
      // TODO: add a better validator
      if (
        Array.isArray(query.search) ||
        Array.isArray(query.sort) ||
        Array.isArray(query.price)
      ) {
        throw new Error("search terms cannot be an array");
      }

      await store.dispatch(fetchProducts(query));

      return {
        props: {
          ...(await serverSideTranslations(locale ?? "es-ar", [
            "common",
            "home",
          ])),
        },
      };
    }
);
