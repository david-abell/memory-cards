import styles from "./Card.module.css";
import { useState } from "react";
import { CardKeys } from "./App";

type CardState = {
  showCards: CardKeys[];
  handleCardClick: () => void;
};

type ClearedCards = { clearedCards: number[] };

type Props = CardKeys & CardState & ClearedCards;

function Card({
  number,
  version,
  showCards,
  handleCardClick,
  clearedCards,
}: Props) {
  const showNumber = showCards.map((card) => card.number).includes(number);

  const showCard = showCards.filter(
    (card) => card.number === number && card.version === version
  );
  const isCleared = clearedCards.includes(number);
  const isWrong = showCards.length >= 2 && showCard.length && !isCleared;

  return (
    <>
      {isCleared ? (
        <div className={[styles.card, styles["card-cleared"]].join(" ")}>
          <p className={styles.content}>{number}</p>
        </div>
      ) : (
        <div
          className={
            isWrong
              ? [styles.card, styles["card-wrong"]].join(" ")
              : styles.card
          }
          onClick={handleCardClick}
        >
          {showNumber && !!showCard.length && (
            <p className={styles.content}>{number}</p>
          )}
        </div>
      )}
    </>
  );
}

export default Card;
