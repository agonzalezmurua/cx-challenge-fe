import {
  fetchProducts,
  selectParameters,
  selectQuery,
} from "@/redux/app.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useTranslation } from "next-i18next";
import { useCallback, useMemo, useRef } from "react";
import { RxCaretRight } from "react-icons/rx";
import styles from "./PriceFilter.module.scss";

const PRICE_ID = "price";
const MINIMUN_NAME = "custom-minimun";
const MAXMIMUN_NAME = "custom-maximun";

export const PriceFilter = () => {
  const form = useRef<HTMLFormElement>(null);
  const { filters } = useAppSelector(selectParameters);
  const query = useAppSelector(selectQuery);
  const dispatch = useAppDispatch();

  const { t } = useTranslation("common");
  const options = useMemo(
    () => filters?.find((f) => f.id === PRICE_ID),
    [filters]
  );
  const getInputDefaults = useCallback((minimun = "", maximun = "") => {
    return [minimun === "*" ? "" : minimun, maximun === "*" ? "" : maximun];
  }, []);

  const [defaultMin, defaultMax] = useMemo(() => {
    if (!query.price) return [undefined, undefined];

    return getInputDefaults(...query.price.split("-"));
  }, [query, getInputDefaults]);

  const handlePriceUpdate = useCallback(
    // value id would be the pre-defined filter value
    // ie: 4000-* or *-10000 or 1000-50000
    (value: string) => {
      dispatch(fetchProducts({ price: value }));

      const [minimun, maximun] = getInputDefaults(...value.split("-"));
      // Update form values, this needs to happen when using the pre-defined filter values
      form.current![MINIMUN_NAME].value = minimun === "*" ? "" : minimun;
      form.current![MAXMIMUN_NAME].value = maximun === "*" ? "" : maximun;
    },
    [dispatch, getInputDefaults]
  );

  return (
    <section className={styles.container}>
      <label className={styles.price_filter__label}>
        {t("product_filter.label")}
      </label>
      {options && (
        <ul role="listbox" className={styles.price_filter__list}>
          {options.values.map((value) => (
            <li
              role="option"
              aria-selected={false}
              key={value.id}
              className={styles.list_item}
              value={value.id}
              onClick={() => {
                handlePriceUpdate(value.id);
              }}
            >
              <span>{value.name}</span>{" "}
              <span className={styles.list_item__results}>
                {t("product_filter.item_range.amount_label", {
                  results: value.results,
                })}
              </span>
            </li>
          ))}
        </ul>
      )}
      <form
        action="#"
        className={styles.custom_filter}
        ref={form}
        onSubmit={(e) => {
          e.preventDefault();
          const minimun = form.current![MINIMUN_NAME].value || "*";
          const maximun = form.current![MAXMIMUN_NAME].value || "*";
          const value = `${minimun}-${maximun}`;

          handlePriceUpdate(value);
        }}
      >
        <input
          className={styles.custom_filter__input}
          min={0}
          defaultValue={defaultMin}
          name={MINIMUN_NAME}
          type="number"
          placeholder={t<string>(
            "product_filter.input_minimun.placeholder_label"
          )}
        />
        <span className={styles.custom_filter__separator} />
        <input
          className={styles.custom_filter__input}
          min={0}
          defaultValue={defaultMax}
          name={MAXMIMUN_NAME}
          type="number"
          placeholder={t<string>(
            "product_filter.input_maximun.placeholder_label"
          )}
        />
        <button className={styles.custom_filter__button}>
          <RxCaretRight />
        </button>
      </form>
    </section>
  );
};
