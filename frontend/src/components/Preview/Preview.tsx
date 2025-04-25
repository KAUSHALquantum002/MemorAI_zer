import React, { useRef, useState } from "react";
import Flashcard from "../Flashcard/Flashcard";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./Preview.module.scss";
import { ReactComponent as LeftArrow } from "../../assets/arrow-left-circle.svg";
import { ReactComponent as RightArrow } from "../../assets/arrow-right-circle.svg";

// Demo cards for memorAI_zer
const cards = [
  {
    front: "What is spaced repetition?",
    back: "A learning technique that increases intervals between reviews to boost long-term retention.",
  },
  {
    front: "How do you write a code block in Markdown?",
    back: "Wrap your code in triple backticks:  \n``````",
  },
  {
    front: "What is the Japanese word for 'memory'?",
    back: "記憶 (kioku)",
  },
  {
    front: "What’s the formula for the area of a circle?",
    back: "$A = \\pi r^2$",
  },
];

/**
 * Preview: memorAI_zer demo carousel
 */
const Preview = () => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const [swiperInitialized, setSwiperInitialized] = useState(false);
  const [swiperUsed, setSwiperUsed] = useState(false);

  return (
    <div className={styles.wrapper}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.3 }}
        className={styles.preview__title}
      >
        <h2>See memorAI_zer in Action</h2>
        <p className={styles.preview__subtitle}>
          Try interactive flashcards-math, code, languages, and more.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.35 }}
        className={styles.swiper__wrapper}
      >
        <div ref={navigationPrevRef}>
          <LeftArrow className={styles.swiper__arrow} />
        </div>
        <Swiper
          slidesPerView={"auto"}
          loop={true}
          autoplay={{
            delay: 7000,
            disableOnInteraction: true,
          }}
          modules={[Navigation, Pagination, Autoplay]}
          navigation={
            swiperInitialized && {
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }
          }
          pagination={true}
          className={styles.swiper}
          onSwiper={() => setSwiperInitialized(true)}
          breakpoints={{
            0: {
              spaceBetween: 16,
              centeredSlides: true,
            },
            768: {
              spaceBetween: 100,
              centeredSlides: false,
            },
          }}
        >
          {cards.map((card, index) => (
            <SwiperSlide key={index} style={{ width: "auto" }}>
              <Flashcard
                front={card.front}
                back={card.back}
                hint={true}
                swiperUsed={swiperUsed}
                setSwiperUsed={setSwiperUsed}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div ref={navigationNextRef}>
          <RightArrow className={styles.swiper__arrow} />
        </div>
      </motion.div>
    </div>
  );
};

export default Preview;
