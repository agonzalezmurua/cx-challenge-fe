import Logo from "@/public/favicon.svg";
import { fetchProducts, selectQuery } from "@/redux/app.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useCallback } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import styles from "./Header.module.scss";

export const Header = () => {
  const query = useAppSelector(selectQuery);
  const dispatch = useAppDispatch();
  const { t } = useTranslation("common");
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(fetchProducts({ search: e.currentTarget.filter.value }));
    },
    [dispatch]
  );

  return (
    <section className={styles.container}>
      <nav className={styles.nav}>
        <Image src={Logo} alt="logo" height={48} width={48} />
        <form action="#" onSubmit={handleSubmit} className={styles.form}>
          <input
            name="filter"
            type="text"
            className={styles.filter}
            defaultValue={query.search}
            placeholder={t<string>("header.input_placeholder")}
          />
          <button className={styles.search}>
            <AiOutlineSearch />
          </button>
        </form>
      </nav>
    </section>
  );
};
