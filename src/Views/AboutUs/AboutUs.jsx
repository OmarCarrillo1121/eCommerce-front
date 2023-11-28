import React from "react";
import styles from "./AboutUs.module.css";

const AboutUs = () => {
  return (
    <div
      className={`${styles.responsiveContainerBlock} ${styles.bigContainer}`}
    >
      <div className={`${styles.responsiveContainerBlock} ${styles.Container}`}>
        <img
          className={styles.mainImg}
          src="https://t3.ftcdn.net/jpg/03/23/88/08/360_F_323880864_TPsH5ropjEBo1ViILJmcFHJqsBzorxUB.jpg"
          alt="Mission"
        />
        <div className={`${styles.allText} ${styles.aboveText}`}>
          <p className={`${styles.textBlk} ${styles.headingText}`}>GameStore</p>
          <p className={`${styles.textBlk} ${styles.subHeadingText}`}>
            Explora, Descubre, Juega.
          </p>
          <p className={`${styles.textBlk} ${styles.description}`}>
            En GameStore, estamos dedicados a ofrecerte la mejor experiencia en
            la compra de videojuegos. Nuestro objetivo es proporcionarte acceso
            a títulos emocionantes y contenido adicional, todo en un solo lugar.
            Entendemos la pasión de los jugadores por los videojuegos y queremos
            ser tu destino para satisfacer esas necesidades.
          </p>
        </div>
      </div>

      <div
        className={`${styles.responsiveContainerBlock} ${styles.Container} ${styles.bottomContainer}`}
      >
        <img
          className={styles.mainImg}
          src="https://www.sitew.com/images/blog/articles/site-jeux/gaming.jpeg"
          alt="Vision"
        />
        <div className={`${styles.allText} ${styles.bottomText}`}>
          <p className={`${styles.textBlk} ${styles.headingText}`}>
            Nuestra misión
          </p>
          <p className={`${styles.textBlk} ${styles.subHeadingText}`}>
            Descubre experiencias únicas y lleva tus juegos al siguiente nivel.
          </p>
          <p className={`${styles.textBlk} ${styles.description}`}>
            Nuestra misión es simple: hacerte descubrir y disfrutar de los
            videojuegos que amas. Queremos que encuentres ofertas increíbles,
            experiencias inolvidables y todo lo que necesitas para llevar tus
            juegos al siguiente nivel. En GameStore, creemos que los videojuegos
            deben ser accesibles y emocionantes para todos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
