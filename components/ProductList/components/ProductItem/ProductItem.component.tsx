import { Product } from "@/models/Product.model";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { BsTruck } from "react-icons/bs";
import styles from "./ProductItem.module.scss";

type ProductItemProps = Product;

export const ProductItem = ({
  address,
  free_shipping,
  id,
  installments,
  picture,
  price,
  title,
  condition,
}: ProductItemProps) => {
  const { t } = useTranslation();

  return (
    <section className={styles.container}>
      <section className={styles.product_picture__container}>
        <Image
          style={{ objectFit: "cover" }}
          className={styles.product_picture__image}
          src={picture}
          alt="product picture"
          fill
        />
      </section>
      <section className={styles.product_container}>
        <section className={styles.product_price__container}>
          <span className={styles.product_price__amount}>
            {t("product.price", {
              amount: price.amount,
              formatParams: {
                amount: { currency: price.currency },
              },
            })}
          </span>
          {free_shipping && (
            <span className={styles.product_price__free_shipping}>
              <BsTruck />
            </span>
          )}
        </section>
        <h2 className={styles.product__name}>{title}</h2>
        <span className={styles.product__installments}>
          {t("product.installments", {
            quantity: installments.quantity,
            amount: installments.amount,
            formatParams: {
              amount: { currency: price.currency },
            },
          })}
        </span>
      </section>
      <section className={styles.product_aside__container}>
        {address.city_name}
      </section>
    </section>
  );
};
