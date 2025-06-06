import { auth, firestore } from "./firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import {
  useCollectionData,
  useCollectionDataOnce,
  useDocumentData,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import store, {
  setDecks,
  RootState,
  setDeckById,
  setDeckMastery,
} from "../../store/store";

/**
 * Custom hook to read  auth record and user profile doc
 */
export function useUserData() {
  const [user] = useAuthState(auth as any);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const ref = firestore.collection("users").doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
}

/**
 * Custom hook to get deck data from firestore, and store it in the redux store.
 * Data will only be fetched if the decks array in the store is empty
 * @returns An array of decks
 */
export function useDecks(): Deck[] {
  const decks = useSelector((state: RootState) => state.decks.decks);

  const [value, loading, error, snapshot] = useCollectionDataOnce(
    decks.length === 0 // check if data is already in store
      ? (firestore
          .collection("decks")
          .where("public", "==", true)
          .limit(10) as any)
      : null
  );

  // Get the first 5 cards PER DECK using a collectionGroup query
  const [cardsValue, cardsLoading, cardsError, cardsSnapshot] =
    useCollectionDataOnce(
      decks.length === 0 // check if data is already in store
        ? (firestore.collectionGroup("cards") as any)
        : null
    );

  useEffect(() => {
    if (cardsSnapshot && snapshot) {
      const docs = snapshot.docs.map((doc) => {
        const deckCards = cardsSnapshot.docs
          .filter((cardDoc) => cardDoc.ref.parent?.parent?.id === doc.id)
          .map((cardDoc) => {
            return {
              id: cardDoc.id,
              front: cardDoc.data()?.front,
              back: cardDoc.data()?.back,
              created: cardDoc.data()?.created?.toMillis(),
            } as Card;
          });
        return {
          ...doc.data(),
          id: doc.id,
          path: doc.ref.path,
          cards: deckCards as Card[],
          allCardsLoaded: false,
          created: doc.data()?.created.toMillis(), // Convert firebase timestamp to milliseconds
        } as Deck;
      });
      store.dispatch(setDecks(docs));
    }
  }, [cardsSnapshot, snapshot]);

  return decks;
}

/**
 * Custom hook to get deck data and all cards from firestore, and store it in the redux store.
 * Data will only be fetched once per session for each deck (tracked by deck.allCardsLoaded)
 * @param deckId - ID of the deck to fetch data for
 * @returns The deck with the corresponding ID, or undefined if not found
 */
export function useDeck(deckId: string): Deck | undefined {
  const decks = useSelector((state: RootState) => state.decks.decks);

  const [value, loading, error, snapshot] = useDocumentData(
    deckId !== ""
      ? decks.find((deck) => deck.id === deckId)?.allCardsLoaded // check if all cards have been loaded for this deck
        ? null
        : (firestore.collection("decks").doc(deckId) as any)
      : null
  );

  // Get cards for the deck
  const [cardsValue, cardsLoading, cardsError, cardsSnapshot] =
    useCollectionData(
      deckId !== ""
        ? decks.find((deck) => deck.id === deckId)?.allCardsLoaded // check if all cards have been loaded for this deck
          ? null
          : (firestore
              .collection("decks")
              .doc(deckId)
              .collection("cards") as any)
        : null
    );

  // Set card data for the deck in the redux store
  useEffect(() => {
    if (cardsSnapshot && value && snapshot) {
      const deckCards = cardsSnapshot.docs.map((cardDoc) => {
        return {
          id: cardDoc.id,
          front: cardDoc.data()?.front,
          back: cardDoc.data()?.back,
          created: cardDoc.data()?.created?.toMillis(),
        } as Card;
      });

      store.dispatch(
        setDeckById(deckId, {
          ...value,
          id: snapshot.id,
          path: snapshot.ref.path,
          created: value.created.toMillis(),
          allCardsLoaded: true,
          cards: deckCards,
        } as Deck)
      );
    }
  }, [cardsSnapshot, value, snapshot]);

  // Return the corresponding deck, or undefined if not found
  return deckId !== "" ? decks.find((deck) => deck.id === deckId) : undefined;
}

/**
 * Custom hook to get mastery for a certain deck and user from firestore,
 * and store it in the redux store.
 * Data will only be fetched once per session for each deck (tracked by deck.masteryLoaded)
 * @param deckId - ID of the deck to fetch data for
 * @returns The mastery for the deck with the corresponding ID, or undefined if not found
 */
export function useDeckMastery(deckId: string): Mastery[] | undefined {
  const user = auth.currentUser;

  const mastery = useSelector((state: RootState) => state.mastery[deckId]);

  const [value, loading, error, snapshot] = useCollectionDataOnce(
    deckId !== "" && user
      ? (firestore
          .collection("users")
          .doc(user.uid)
          .collection("mastery")
          .doc(deckId)
          .collection("masteryPerCard") as any)
      : null
  );

  useEffect(() => {
    if (value && snapshot) {
      const deckMastery: Mastery[] = snapshot.docs.map((cardDoc) => {
        return {
          [cardDoc.id]: cardDoc.data().masteryLevel,
        } as Mastery;
      });
      store.dispatch(setDeckMastery(deckId, deckMastery));
    }
  }, [value, snapshot]);

  return deckId !== "" && user ? mastery : undefined;
}
