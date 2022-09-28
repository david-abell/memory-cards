import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import styles from "./App.module.css";

export type CardKeys = {
  number: number;
  version: "a" | "b";
};

function createUnsortedCards(target: number) {
  let unsortedCards: CardKeys[] = [];
  const inRangeTarget = Math.min(12, Math.max(2, target)) ** 2;
  const roundedTarget =
    inRangeTarget % 2 === 0 ? inRangeTarget / 2 : (inRangeTarget - 1) / 2;

  for (let i = 0; i < roundedTarget; i++) {
    const cardA: CardKeys = {
      number: i + 1,
      version: "a",
    };
    const cardB: CardKeys = {
      number: i + 1,
      version: "b",
    };
    unsortedCards.push(cardA);
    unsortedCards.push(cardB);
  }
  return unsortedCards;
}

const DEFAULT_GRID_COUNT = 6;

function App() {
  const [showCards, setShowCards] = useState<CardKeys[]>([]);
  const [clearedCards, setClearedCards] = useState<number[]>([]);
  const [shuffledCards, setShuffledCards] = useState<CardKeys[]>(
    handleCardShuffle(createUnsortedCards(DEFAULT_GRID_COUNT))
  );
  const [gridCount, setGridCount] = useState(DEFAULT_GRID_COUNT);
  const [isNewGame, setIsNewGame] = useState(false);
  const [totalGuesses, setTotalGuesses] = useState(0);

  const gridCountRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cardTimeout: number;
    if (showCards.length > 1 && showCards[0].number === showCards[1].number) {
      setClearedCards((prev) => [...prev, showCards[0].number]);
      setShowCards([]);
    } else {
      if (showCards.length >= 2) {
        cardTimeout = setTimeout(() => {
          setShowCards([]);
          setTotalGuesses((prev) => prev + 1);
        }, 1000);
      }
    }
    return () => clearTimeout(cardTimeout);
  }, [showCards]);

  useEffect(() => {
    if (isNewGame) {
      setIsNewGame(false);
      handleNewGame();
    }
  }, [isNewGame]);

  function handleCardShuffle(cards: CardKeys[]): CardKeys[] {
    return cards
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  const handleCardClick = (card: CardKeys) => {
    if (showCards.length >= 2) return;
    setShowCards((prev) => [
      ...prev,
      { number: card.number, version: card.version },
    ]);
  };

  function handleSetGridCount(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    const inputGridCount = gridCountRef.current?.value;
    document.documentElement.style.setProperty(
      "--grid-col-count",
      String(inputGridCount)
    );
    setGridCount(Number(inputGridCount));
    setIsNewGame(true);
  }

  function handleNewGame(): void {
    setShowCards([]);
    setClearedCards([]);
    const cardSet = handleCardShuffle(createUnsortedCards(gridCount));
    setShuffledCards(cardSet);
    setTotalGuesses(0);
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Match two</h1>
        <form className={styles.form}>
          <label htmlFor="grid-count">Column count</label>
          <input
            type={"number"}
            min={2}
            max={12}
            id="grid-count"
            ref={gridCountRef}
            placeholder={String(gridCount)}
          />
          <button onClick={(e) => handleSetGridCount(e)}>Start new Game</button>
        </form>
        <div>
          <label htmlFor="numbers-cleared">Total cards cleared</label>
          <span id="numbers-cleared">{clearedCards.length}</span>
          <label htmlFor="number-of-guesses">Number of guesses</label>
          <span id="number-of-guesses">{totalGuesses}</span>
        </div>
      </header>
      <div className={styles["game-board"]}>
        {shuffledCards.map((card: CardKeys, index) => {
          return (
            <React.Fragment key={index + "key"}>
              <Card
                number={card.number}
                handleCardClick={() =>
                  handleCardClick({
                    number: card.number,
                    version: card.version,
                  })
                }
                version={card.version}
                key={index + card.version}
                showCards={showCards}
                clearedCards={clearedCards}
              />
            </React.Fragment>
          );
        })}
        {clearedCards.length > 0 &&
          clearedCards.length * 2 === shuffledCards.length && (
            <div className={styles.victory}>
              <p>Victory!</p>
              <button onClick={(e) => handleSetGridCount(e)}>
                Start new game
              </button>
            </div>
          )}
      </div>
    </div>
  );
}

export default App;
