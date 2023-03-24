import { Product } from "@/models/Product";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import styles from "./ProductCard.module.scss";
import { BsTruck } from "react-icons/bs";

type ProductCardProps = Product;

export const ProductCard = ({
  address,
  free_shipping,
  id,
  installments,
  picture,
  price,
  title,
  condition,
}: ProductCardProps) => {
  const { t } = useTranslation("home");

  return (
    <section className={styles.container}>
      <section className={styles.product_picture__container}>
        <Image src={picture} alt="product picture" fill />
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
        <h2 className={styles.product_name}>{title}</h2>
        <span className={styles.product_installments}>
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
