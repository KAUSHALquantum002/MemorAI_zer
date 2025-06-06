import React, { useEffect } from "react";
// import Flashcard from "../components/Flashcard/Flashcard";
import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Preview from "../components/Preview/Preview";

const Home = () => {
  useEffect(() => {
    document.title = "memorAI_zer: Next-gen Flashcards";
  }, []);
  return (
    <>
      <Hero />
      <About />
      <Preview />
    </>
  );
};

export default Home;
