import { selectProducts } from "@/redux/app.slice";
import { useAppSelector } from "@/redux/store";
import { ProductItem } from "./components";
import styles from "./ProductList.module.scss";

export const ProductList = () => {
  const products = useAppSelector(selectProducts);
  return (
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
  );
};
