import { selectQuery } from "@/redux/app.slice";
import { useAppSelector } from "@/redux/store";
import { useTranslation } from "next-i18next";
import styles from "./NoResults.module.scss";

export const NoResults = () => {
  const query = useAppSelector(selectQuery);
  const { t } = useTranslation();

  return (
    <section className={styles.container}>
      <section className={styles.no_results__ilustration}>🌧️</section>
      <h1 className={styles.no_results__title}>
        {t("product_list.empty_result_with_query.title")}
      </h1>
      <p className={styles.no_results__label}>
        {t("product_list.empty_result_with_query.label")}
      </p>
    </section>
  );
};
