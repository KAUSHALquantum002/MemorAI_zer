import React, { useEffect } from "react";
import DeckSelection from "../components/DeckSelection/DeckSelection";

const Decks = () => {
  useEffect(() => {
    document.title = "Decks | memorAI_zer: Next-gen Flashcards";
  }, []);
  return (
    <div>
      <DeckSelection />
    </div>
  );
};

export default Decks;
