import React from "react";
import styles from "./Contact.module.css";
import TeamMember from "./TeamMember";

const Contact = () => {
  return (
    <section>
      <div className={`${styles.responsiveContainerBlock} ${styles.container}`}>
        <p className={styles.teamHeadText}>Nuestro equipo</p>
        <div className={styles.responsiveContainerBlock}>
          <TeamMember
            name="Omar Carrillo"
            position="Full Stack Developer"
            imageSrc="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/ET7.15.png"
            gitHubLink="https://github.com/OmarCarrillo1121"
            linkedInLink="https://www.linkedin.com/in/ruben-rodriguez-carrillo/"
          />
          <TeamMember
            name="Patricio Rodriguez"
            position="Full Stack Developer"
            imageSrc="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/expert2.png"
            gitHubLink="https://github.com/patorodriguez12"
            linkedInLink="https://www.linkedin.com/in/patricio-rodriguez-a361a7108/"
          />
          <TeamMember
            name="Luis Barrios"
            position="Full Stack Developer"
            imageSrc="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/ET7.15.png"
            gitHubLink="https://github.com/Luis901810"
            linkedInLink="https://www.linkedin.com/in/luis-barrios-10541627a/"
          />
          <TeamMember
            name="Tomas Idalgo"
            position="Full Stack Developer"
            imageSrc="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/ET7.15.png"
            gitHubLink="https://github.com/TSantiagoIdalgo"
            linkedInLink="https://www.linkedin.com/in/tomas-idalgo-359827240/"
          />
          <TeamMember
            name="Laura Espindola"
            position="Full Stack Developer"
            imageSrc="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/ET7.15.png"
            gitHubLink="https://github.com/Luli-espindola"
            linkedInLink="https://www.linkedin.com/in/laura-espindola-12a7451b7/"
          />
          <TeamMember
            name="Mauricio Alonso"
            position="Full Stack Developer"
            imageSrc="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/ET7.15.png"
            gitHubLink="https://github.com/MauricioAlonso28"
            linkedInLink="https://www.linkedin.com/in/mauricio-ayllon28/"
          />
          <TeamMember
            name="Sebastian Kang"
            position="Full Stack Developer"
            imageSrc="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/ET7.15.png"
            gitHubLink="https://github.com/sebastiankang"
            linkedInLink="https://www.linkedin.com/in/sebastian-kang-29a335270/"
          />
          <TeamMember
            name="Edward Vasallo Eraso"
            position="Full Stack Developer"
            imageSrc="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/ET7.15.png"
            gitHubLink="https://github.com/EdwardVE"
            linkedInLink="https://www.linkedin.com/in/edward-vasallo-83a7a6159?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
