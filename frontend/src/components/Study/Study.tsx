import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeck, useDeckMastery } from "../utils/hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./Study.module.scss";
import Flashcard from "../Flashcard/Flashcard";
import Button from "../Button/Button";


/**
 * Study component (study mode): study all cards in a deck (based on deckId in URL)
 * @todo Use swiper to swipe through cards
 *       (To avoid lag on large decks, only pass 3 cards to swiper at once: current, prev, next)
 */
const Study = () => {
  const { deckId = "" } = useParams<{ deckId: string }>();
  const [currentCard, setCurrentCard] = useState(0);

  const deck = useDeck(deckId);
  //const deckMastery = useDeckMastery(deckId);

  useEffect(() => {
    document.title = `Study ${deck?.title} | Next-gen Flashcards`;
  }, []);

  const navigate = useNavigate();

  const swiperRef = useRef() as any;

  if (!deck || !deck.cards) return null;

  const totalCards = deck.cards.length;

  const handleBad = (swiper: typeof Swiper) => {
    if (currentCard + 1 === totalCards) {
      return;
    }
    // swipe forward
    swiperRef?.current?.slideNext();
  };

  const handleSaveAndExit = () => {
    // save data to firebase
    navigate(`/decks/${deckId}`);
  };

  return (
    <div className={styles.study}>
      <h2>{deck.title}</h2>
      <div className={styles.study__cards}>
        <Swiper
          slidesPerView={1}
          spaceBetween={60}
          loop={false}
          modules={[Navigation]}
          navigation={true}
          className={styles.swiper}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            swiper.on("slideChange", () => {
              setCurrentCard(swiper.activeIndex);
            });
          }}
        >
          {deck.cards.map((card, index) => (
            <SwiperSlide key={index} style={{ width: "auto" }}>
              <Flashcard
                front={card.front}
                back={card.back}
                size="large"
                key={index}
                isStudyMode={true}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles.study__buttons}>
          <Button
            label="Needs Practice"
            onClick={() => handleBad(Swiper)}
            againstpage
          />
          <Button
            label="Save and Exit"
            onClick={handleSaveAndExit}
            againstpage
          />
        </div>
        <div className={styles.study__cardcount}>
          {currentCard + 1} / {totalCards}
        </div>
      </div>
    </div>
  );
};

export default Study;
