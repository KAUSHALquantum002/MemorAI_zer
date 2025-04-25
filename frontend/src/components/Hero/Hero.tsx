import React from "react";
import styles from "./Hero.module.scss";
import Flashcard from "../Flashcard/Flashcard";
import Button from "../Button/Button";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

/**
 * Hero component: memorAI_zer landing section with features and demo card
 */
const Hero = () => (
  <div className={styles.hero} id="home">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.25,
        opacity: { ease: "easeIn" },
        y: { ease: "easeOut" },
      }}
      className={styles.hero__text}
    >
      <h1>memorAI_zer</h1>
      <h2>Smarter Recall. Effortless Learning.</h2>
      <ul>
        <li>Open source & always free</li>
        <li>No ads, no distractions-just learning</li>
        <li>Supports Markdown, LaTeX, code, and more</li>
        <li>Easy import/export: Anki, Quizlet, CSV</li>
      </ul>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        className={styles.hero__buttons}
      >
        <div className={styles.hero__button}>
          <Button label="Start Learning" link="/decks" againstpage />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className={styles.hero__button}
        >
          <Button label="How It Works" link="/about" againstpage />
        </motion.div>
      </motion.div>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.1 }}
      className={styles.hero__flashcard}
    >
      <Tilt
        tiltMaxAngleX={6}
        tiltMaxAngleY={12}
        scale={1.04}
        tiltAngleYInitial={8}
        tiltAngleXInitial={0}
      >
        <Flashcard
          front="What makes memorAI_zer unique?"
          back={`• Adaptive spaced repetition\n• Supports math, code, and languages\n• Share decks, collaborate, and learn together\n• 100% open source`}
          hint={true}
        />
      </Tilt>
    </motion.div>
  </div>
);

export default Hero;
