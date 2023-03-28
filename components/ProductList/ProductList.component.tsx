import { selectProducts } from "@/redux/app.slice";
import { useAppSelector } from "@/redux/store";
import { NoResults } from "./components/NoResults";
import { ProductItem } from "./components/ProductItem";
import styles from "./ProductList.module.scss";

export const ProductList = () => {
  const products = useAppSelector(selectProducts);
  return (
    <section className={styles.container}>
      {!products.length ? (
        <NoResults />
      ) : (
        products.length && (
          <ul className={styles.product_list}>
            {products.map((p) => (
              <li key={p.id}>
                <ProductItem
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
        )
      )}
    </section>
  );
};
