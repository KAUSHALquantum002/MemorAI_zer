import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import Button from "../Button/Button";
import { Squash as HamburgerButton } from "hamburger-react";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import { motion } from "framer-motion";
import { UserContext } from "../utils/context";
import { ReactComponent as User } from "../../assets/user.svg";
import { ReactComponent as Power } from "../../assets/power.svg";
import { auth } from "../../components/utils/firebase";
import { InnerMoon } from "@theme-toggles/react";
import "@theme-toggles/react/css/InnerMoon.css";

interface NavbarProps {
  switchTheme: () => void;
  theme: string;
}

/**
 * memorAI_zer Navbar: Responsive navigation bar with theme toggle, user menu, and hamburger for mobile.
 */
const Navbar = ({ switchTheme, theme }: NavbarProps) => {
  const [isOpen, setOpen] = useState(false);

  // Main navigation links
  const navLinks = [
    { link: "/", label: "Home" },
    { link: "/about", label: "About" },
    { link: "/decks", label: "Decks" },
    { link: "/create", label: "Create" },
  ];

  // User context
  const { user, username } = useContext(UserContext);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.logo}>
          memorAI_zer
        </Link>
        <ul className={styles.navbar__list}>
          {navLinks.map((item) => (
            <li className={styles.navbar__item} key={item.link}>
              <Link to={item.link} className={styles.navbar__link}>
                {item.label}
              </Link>
            </li>
          ))}
          {user ? (
            <DropdownMenu
              isNavMenu={true}
              toggleButton={
                <div className={styles.navbar__item}>
                  <div className={styles.navbar__link}>
                    <User fill="currentColor" className={styles.usericon} />
                    {username}
                  </div>
                </div>
              }
            >
              <li className={styles.navbar__item + " " + styles.navbar__themetoggle__wrapper}>
                <div className={styles.navbar__link} onClick={switchTheme}>
                  Theme
                </div>
                <InnerMoon
                  toggle={switchTheme}
                  toggled={theme === "dark"}
                  className={styles.navbar__themetoggle}
                />
              </li>
              <li className={styles.navbar__item}>
                <Link to="/account" className={styles.navbar__link}>
                  <User fill="currentColor" className={styles.usericon} />
                  Account
                </Link>
              </li>
              <li className={styles.navbar__item}>
                <div className={styles.navbar__link} onClick={() => auth.signOut()}>
                  <Power fill="currentColor" className={styles.usericon} />
                  Log Out
                </div>
              </li>
            </DropdownMenu>
          ) : (
            <>
              <li className={styles.navbar__item + " " + styles.navbar__themetoggle__wrapper}>
                <div className={styles.navbar__link} onClick={switchTheme}>
                  Theme
                </div>
                <InnerMoon
                  toggle={switchTheme}
                  toggled={theme === "dark"}
                  className={styles.navbar__themetoggle}
                />
              </li>
              <div className={styles.navbar__item}>
                <Button label="Sign Up" link="/signup" againstcard />
              </div>
              <div className={styles.navbar__item}>
                <Button label="Sign In" link="/login" againstcard />
              </div>
            </>
          )}
        </ul>
        <div className={styles.hamburgerbutton}>
          <HamburgerButton
            toggled={isOpen}
            toggle={setOpen}
            color={"var(--menu-font)"}
          />
        </div>
      </nav>
      {isOpen && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.2 }}
          className={styles.hamburger}
        >
          <ul className={styles.hamburger__list}>
            {navLinks.map((item) => (
              <li className={styles.hamburger__item} key={item.link}>
                <Link to={item.link} className={styles.navbar__link}>
                  {item.label}
                </Link>
              </li>
            ))}
            <div className={styles.hamburger__bottom}>
              <li className={styles.hamburger__item + " " + styles.navbar__themetoggle__wrapper}>
                <InnerMoon
                  toggle={switchTheme}
                  toggled={theme === "dark"}
                  className={styles.navbar__themetoggle}
                />
                <a className={styles.navbar__link} onClick={switchTheme}>
                  Theme
                </a>
              </li>
              {user ? (
                <>
                  <div className={styles.hamburger__item}>
                    <Link to="/account" className={styles.navbar__link}>
                      <User fill="currentColor" className={styles.usericon} />
                      {username}
                    </Link>
                  </div>
                  <li className={styles.hamburger__item}>
                    <div className={styles.navbar__link} onClick={() => auth.signOut()}>
                      <Power fill="currentColor" className={styles.usericon} />
                      Log Out
                    </div>
                  </li>
                </>
              ) : (
                <>
                  <div className={styles.hamburger__item}>
                    <Button label="Sign Up" link="/signup" againstcard />
                  </div>
                  <div className={styles.hamburger__item}>
                    <Button label="Sign In" link="/login" againstcard />
                  </div>
                </>
              )}
            </div>
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Navbar;
