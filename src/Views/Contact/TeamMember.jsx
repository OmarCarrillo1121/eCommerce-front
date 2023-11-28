import React from "react";
import styles from "./Contact.module.css";

const TeamMember = ({
  name,
  position,
  imageSrc,
  featureText,
  gitHubLink,
  linkedInLink,
}) => {
  return (
    <div
      className={`${styles.responsiveCellBlock} ${styles.wkDesk3} ${styles.wkIpadp3} ${styles.wkTab6} ${styles.wkMobile12} ${styles.cardContainer}`}
    >
      <div className={styles.card}>
        <div className={styles.teamImageWrapper}>
          <img className={styles.teamMemberImage} src={imageSrc} alt={name} />
        </div>
        <p className={`${styles.textBlk} ${styles.name}`}>{name}</p>
        <p className={`${styles.textBlk} ${styles.position}`}>{position}</p>
        <p className={`${styles.textBlk} ${styles.featureText}`}>
          {featureText}
        </p>
        <div className={styles.socialIcons}>
          <a href={gitHubLink} target="_blank" rel="noopener noreferrer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/640px-GitHub_Invertocat_Logo.svg.png"
              alt="GitHub"
            />
          </a>
          <a href={linkedInLink} target="_blank" rel="noopener noreferrer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg"
              alt="LinkedIn"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
