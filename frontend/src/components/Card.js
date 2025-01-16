import React, { useState, useEffect } from "react";
import s from "../styles/styles.module.scss";

function Card({
  id, 
  number,
  title,
  description,
  onDelete,
  isActive,
  setActiveCardId,
}) {
  const [clicked, setClicked] = useState(false);
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (isActive) {
      setClicked(true);
      setShowDeleteBtn(true);
    } else {
      setClicked(false);
      setShowDeleteBtn(false);
    }
  }, [isActive]);

  const handleClick = () => {
    if (!isActive) {
      setActiveCardId(number); 
    } else {
      setActiveCardId(null);
    }
  };

  useEffect(() => {
    if (isActive) {
      const newTimer = setTimeout(() => {
        setShowDeleteBtn(false);
        setClicked(false);
      }, 2000);
      setTimer(newTimer);
    } else {
      clearTimeout(timer);
    }
  }, [isActive]);

  return (
    <div
      className={`${s.card} ${clicked ? s.clicked : ""}`}
      onClick={handleClick}
    >
      <div className={s.cardContent}>
        <h3 className={s.title}>{`${number}. ${title}`}</h3>{" "}
        <p className={s.description}>{description}</p>
      </div>
      {showDeleteBtn && (
        <button
          className={s.deleteBtn}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
            clearTimeout(timer);
            setClicked(false);
            setShowDeleteBtn(false);
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
}

export default Card;
