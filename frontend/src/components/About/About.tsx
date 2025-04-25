import React from "react";
import styles from "./About.module.scss";
import { motion } from "framer-motion";
import { ReactComponent as Ebbinghaus } from "../../assets/ebbinghaus-curve.svg";
import { ReactComponent as SRSCurve } from "../../assets/srs-curve.svg";

interface AboutProps {
  extended?: boolean;
}

const About = ({ extended }: AboutProps) => (
  <div className={styles.about}>
    {extended && (
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className={styles.about__title}
      >
        About memorAI_zer
      </motion.h2>
    )}

    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.12 }}
      className={styles.about__subtitle}
    >
      Smarter Learning, Powered by Science
    </motion.h2>

    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.18 }}
      className={styles.about__section}
    >
      <div>
        <p>
          At <strong>memorAI_zer</strong>, we believe learning should be efficient, stress-free, and tailored to you. Our platform harnesses the power of{" "}
          <a
            href="https://en.wikipedia.org/wiki/Spaced_repetition"
            target="_blank"
            rel="noopener noreferrer"
          >
            spaced repetition
          </a>{" "}
          — a proven method that helps you remember more, for longer.
        </p>
        <p>
          Instead of endless cramming, memorAI_zer schedules your reviews at just the right moments, focusing on what you find most challenging and letting you breeze past what you’ve mastered. This means less time spent, deeper understanding, and stronger memory retention.
        </p>
        <p>
          Inspired by the science of memory, including the Ebbinghaus forgetting curve, our adaptive algorithm personalizes your study path. Whether you’re prepping for exams, learning a new language, or mastering new skills, memorAI_zer is your personal learning assistant.
        </p>
      </div>
      <div className={styles.about__graphs}>
        <div>
          <h3 className={styles.about__graph__label}>
            Forgetting Curve
          </h3>
          <Ebbinghaus className={styles.about__graph} />
        </div>
        <div>
          <h3 className={styles.about__graph__label}>
            Spaced Repetition in Action
          </h3>
          <SRSCurve className={styles.about__graph} />
        </div>
      </div>
    </motion.div>

    {extended && (
      <>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.24 }}
        >
          <h2 className={styles.about__subtitle}>
            Free, Private, and Open
          </h2>
          <p>
            memorAI_zer is <strong>free</strong> and <strong>open source</strong>. We respect your privacy: no ads, no tracking, no paywalls. Our mission is to make advanced learning tools accessible to everyone, everywhere.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.28 }}
        >
          <h2 className={styles.about__subtitle}>
            Our Story
          </h2>
          <p>
            memorAI_zer was born from a passion for learning and a frustration with outdated study methods. Our team set out to build a next-generation tool that combines cognitive science, smart technology, and a beautiful, distraction-free interface.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.32 }}
        >
          <h2 className={styles.about__subtitle}>
            Get Involved
          </h2>
          <p>
            Want to shape the future of learning? We welcome feedback, feature ideas, and open source contributions. Connect with us on <a href="https://github.com/shrey2003/memorAI_zer" target="_blank" rel="noopener noreferrer">GitHub</a> or reach out anytime.
          </p>
        </motion.div>
      </>
    )}
  </div>
);

export default About;
