import styles from "./Card.module.css";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { CardKeys } from "./App";

type CardState = {
  showCards: CardKeys[];
  setShowCards: Dispatch<SetStateAction<CardKeys[]>>;
};

// setMyVar?: (value: boolean | (prevVar: boolean) => boolean) => void;

type ClearedCards = { clearedCards: number[] };

type Props = CardKeys & CardState & ClearedCards;

function Card({
  number,
  version,
  showCards,
  clearedCards,
  setShowCards,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const showNumber = showCards.map((card) => card.number).includes(number);

  const showCard = showCards.filter(
    (card) => card.number === number && card.version === version
  );
  const isCleared = clearedCards.includes(number);
  const isWrong = showCards.length >= 2 && showCard.length && !isCleared;
  // const isVisible = isCleared ?? (showNumber && showCard.length);

  useEffect(() => {
    if (!showCards.length && !isCleared) {
      setIsVisible(false);
    }
  }, [showCards.length]);

  // useEffect(() => {
  //   let cardTimeout: number;
  //   if (!showCards.length && !isCleared) {
  //     cardTimeout = setTimeout(() => {
  //       setIsVisible(false);
  //     }, 1000);
  //   }
  //   if (isWrong) {
  //     cardTimeout = setTimeout(() => {
  //       setShowCards([]);
  //       setIsVisible(false);
  //     }, 1000);
  //   }
  //   return () => clearTimeout(cardTimeout);
  // }, [isWrong, clearedCards, showCards.length]);

  const handleCardClick = () => {
    if (isVisible || showCards.length >= 2 || isCleared) return;
    setIsVisible(true);
    setShowCards((prev: CardKeys[]) => [...prev, { number, version }]);
  };

  const isVisibleStyles = [styles["card-inner"], styles["card-clicked"]].join(
    " "
  );
  const isHiddenStyles = styles["card-inner"];

  return (
    <>
      <div className={styles.card} onClick={handleCardClick}>
        <div className={isVisible ? isVisibleStyles : isHiddenStyles}>
          <div className={styles["card-back"]}></div>
          <div className={styles["card-front"]}>
            <p>{number}</p>
          </div>
        </div>
        {/* {showNumber && !!showCard.length && (
            <p className={styles.content}>{number}</p>
          )} */}
      </div>
    </>
  );
}

export default Card;
