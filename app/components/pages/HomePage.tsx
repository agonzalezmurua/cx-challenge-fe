import { Content } from "@/components/layout/Content";
import { Header } from "@/components/layout/Header";
import { ProductCard } from "@/components/ProductCard";
import { GlobalContext } from "@/contexts/global.context";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { useContext, useEffect } from "react";
import useSwr from "swr";
import styles from "./HomePage.module.scss";

export function HomePage() {
  const { t } = useTranslation("home");
  const { products } = useContext(GlobalContext);
  const {
    query: { search },
    actions: { updateProducts },
  } = useContext(GlobalContext);
  useSwr(`/api/products?search=${search}`, {
    onSuccess: (data) => {
      updateProducts(data);
    },
  });

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
          <section></section>
          <ul className={styles.product_list}>
            {products.map((p) => (
              <li key={p.id}>
                <ProductCard
                  id={p.id}
                  condition={p.condition}
                  address={p.address}
                  free_shipping={p.free_shipping}
                  installments={p.installments}
                  picture={p.picture}
                  price={p.price}
                  title={p.title}
                />
              </li>
            ))}
          </ul>
          <section></section>
        </Content>
      </main>
    </>
  );
}
