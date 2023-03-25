import { GlobalContext } from "@/global.context";
import { useCallback, useContext, useRef } from "react";
import { useTranslation } from "next-i18next";
import styles from "./SortFilter.module.scss";
import { useToggle } from "react-use";
import { RxCaretDown } from "react-icons/rx";
import useClickAway from "react-use/lib/useClickAway";
import type { SearchSort } from "@/models/SearchSort.model";

export const SortFilter = () => {
  const container = useRef(null);
  const [collapsed, toggleCollapse] = useToggle(true);
  const { t } = useTranslation("common");
  const {
    query: { sort },
    parameters: { sorts },
    actions: { updateQuery },
  } = useContext(GlobalContext);

  useClickAway(container, () => {
    if (collapsed) return;

    toggleCollapse(true);
  });

  const onSelect = useCallback(
    (sort: SearchSort) => {
      updateQuery({ sort: sort });
      toggleCollapse(true);
    },
    [updateQuery, toggleCollapse]
  );

  return (
    <section className={styles.filter} ref={container}>
      <span
        className={styles.filter__label}
        data-collapsed={collapsed}
        onClick={toggleCollapse}
      >
        {t("product_sort.selected_label", { sort: sort?.name })}
        <RxCaretDown className={styles.filter__caret} />
      </span>
      <ul role="listbox" hidden={collapsed} className={styles.list}>
        {sort && (
          <SortFilterItem selected value={sort}>
            {sort?.name}
          </SortFilterItem>
        )}
        {sorts.map((s) => (
          <SortFilterItem key={s.id} value={s} onClick={onSelect}>
            {s.name}
          </SortFilterItem>
        ))}
      </ul>
    </section>
  );
};

const SortFilterItem = ({
  selected = false,
  value,
  children,
  onClick,
}: {
  selected?: boolean;
  value: SearchSort;
  children: string;
  onClick?: (search: SearchSort) => void;
}) => (
  <li
    role="option"
    aria-selected={selected}
    className={styles.list__item}
    value={value.name}
    onClick={() => onClick && onClick(value)}
  >
    {children}
  </li>
);
