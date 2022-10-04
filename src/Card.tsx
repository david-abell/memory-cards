import styles from "./Card.module.css";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { CardKeys } from "./App";

type CardState = {
  showCards: CardKeys[];
  setShowCards: Dispatch<SetStateAction<CardKeys[]>>;
};

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
  const isCleared = clearedCards.includes(number);

  useEffect(() => {
    if (!showCards.length && !isCleared) {
      setIsVisible(false);
    }
  }, [showCards.length]);

  const handleCardClick = () => {
    if (isVisible || showCards.length >= 2 || isCleared) return;
    setIsVisible(true);
    setShowCards((prev: CardKeys[]) => [...prev, { number, version }]);
  };

  const visibleStyles = [styles["card-inner"], styles["card-clicked"]].join(
    " "
  );
  const hiddenStyles = styles["card-inner"];
  const clearedStyles = [styles["card-fade"], styles.card].join(" ");

  return (
    <div className={isCleared ? clearedStyles : styles.card}>
      <button
        className={isVisible ? visibleStyles : hiddenStyles}
        onClick={handleCardClick}
      >
        <div className={styles["card-back"]}></div>
        <div className={styles["card-front"]}>
          <p>{number}</p>
        </div>
      </button>
    </div>
  );
}

export default Card;
