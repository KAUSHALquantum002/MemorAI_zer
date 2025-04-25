import React from "react";
import styles from "./Footer.module.scss";

const currentYear = new Date().getFullYear();

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footer__brand}>
      <span className={styles.footer__logo}>memorAI_zer</span>
      <span className={styles.footer__tagline}>Smarter Recall. Effortless Learning.</span>
    </div>
    <nav className={styles.footer__links} aria-label="Footer navigation">
      <a
        href="https://github.com/your-org/memoraizer"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.footer__link}
      >
        GitHub
      </a>
      <a
        href="mailto:team@memoraizer.app"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.footer__link}
      >
        Contact
      </a>
      <a
        href="https://github.com/your-org/memoraizer#license"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.footer__link}
      >
        License
      </a>
    </nav>
    <div className={styles.footer__copy}>
      <span>
        &copy; {currentYear} memorAI_zer. Open source. All rights reserved.
      </span>
    </div>
  </footer>
);

export default Footer;
