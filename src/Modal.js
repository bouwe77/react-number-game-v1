import React from "react";
import styles from "./Modal.module.css";

export default ({ children, width = "200px" }) => (
  <div className={`${styles.modal} ${styles["display-block"]}`}>
    <section className={styles["modal-main"]} style={{ width }}>
      {children}
    </section>
  </div>
);
