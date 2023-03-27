import type { SearchSort } from "@/models/SearchSort.model";
import {
  fetchProducts,
  selectParameters,
  selectQuery,
} from "@/redux/app.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useTranslation } from "next-i18next";
import { useCallback, useRef } from "react";
import { RxCaretDown } from "react-icons/rx";
import { useToggle } from "react-use";
import useClickAway from "react-use/lib/useClickAway";
import styles from "./SortFilter.module.scss";

export const SortFilter = () => {
  const list = useRef(null);
  const [open, toggleOpen] = useToggle(false);
  const { t } = useTranslation("common");

  const { sorts } = useAppSelector(selectParameters);
  const { sort } = useAppSelector(selectQuery);
  const dispatch = useAppDispatch();

  useClickAway(
    list,
    () => {
      if (!open) return;

      toggleOpen(false);
    },
    ["click"]
  );

  const handleSelect = useCallback(
    (sort: SearchSort) => {
      toggleOpen(false);
      dispatch(fetchProducts({ sort: sort.id }));
    },
    [toggleOpen, dispatch]
  );

  return (
    <section ref={list} className={styles.filter} data-testid="sort_filter">
      <span className={styles.filter__container}>
        <span className={styles.filter__label}>
          {t("product_sort.selected_label")}
        </span>
        <section
          data-testid="sort_trigger"
          className={styles.filter__control}
          onClick={() => toggleOpen()}
        >
          <span>{sort?.name}</span>
          <RxCaretDown className={styles.filter__caret} />
        </section>
      </span>
      <ul
        data-testid="sort_listbox"
        aria-expanded={open}
        role="listbox"
        hidden={!open}
        className={styles.list}
      >
        {sort && (
          <SortFilterItem selected value={sort}>
            {sort?.name}
          </SortFilterItem>
        )}
        {sorts.map((s) => (
          <SortFilterItem key={s.id} value={s} onClick={handleSelect}>
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
