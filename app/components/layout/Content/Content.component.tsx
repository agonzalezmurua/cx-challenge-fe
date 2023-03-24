import { Children } from "react";
import styles from "./Content.module.scss";

type ContentProps = {
  children: [JSX.Element, JSX.Element, JSX.Element];
};

export const Content = (props: ContentProps) => {
  const [left, middle, right] = Children.toArray(props.children);

  return (
    <section className={styles.container}>
      <section className={styles.left}>{left}</section>
      <section className={styles.middle}>{middle}</section>
      <section className={styles.right}>{right}</section>
    </section>
  );
};
