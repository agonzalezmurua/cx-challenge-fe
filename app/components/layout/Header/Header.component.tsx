import { GlobalContext } from "@/global.context";
import Logo from "@/public/favicon.svg";
import Image from "next/image";
import { useCallback, useContext } from "react";
import { useTranslation } from "next-i18next";
import { AiOutlineSearch } from "react-icons/ai";
import styles from "./Header.module.scss";

export const Header = () => {
  const { query, actions } = useContext(GlobalContext);
  const { t } = useTranslation("common");
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      actions.updateQuery({ ...query, search: e.currentTarget.filter.value });
    },
    [query, actions]
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
