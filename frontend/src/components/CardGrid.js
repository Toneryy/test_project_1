import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import s from "../styles/styles.module.scss";

function CardGrid() {
  const [cards, setCards] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("New Card");
  const [newCardDescription, setNewCardDescription] = useState("Description");
  const [activeCardId, setActiveCardId] = useState(null);

  const fetchCards = () => {
    axios
      .get("http://localhost:3001/api/cards")
      .then((res) => setCards(res.data.sort((a, b) => a.number - b.number)));
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const addCard = () => {
    if (newCardTitle && newCardDescription) {
      const newCard = { title: newCardTitle, description: newCardDescription };
      axios.post("http://localhost:3001/api/cards", newCard).then(() => {
        fetchCards();
        setIsAdding(false);
        setNewCardTitle("New Card");
        setNewCardDescription("Description");
      });
    }
  };

  const deleteCard = (id) => {
    axios.delete(`http://localhost:3001/api/cards/${id}`).then(() => {
      fetchCards();
    });
  };

  return (
    <div className={s.cardGrid}>
      <button className={s.addCard} onClick={() => setIsAdding(true)}>
        Add Card
      </button>

      {isAdding && (
        <div className={s.newCardForm}>
          <input
            type="text"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            value={newCardDescription}
            onChange={(e) => setNewCardDescription(e.target.value)}
            placeholder="Description"
          />
          <div className={s.buttons}>
            <button onClick={addCard}>Save</button>
            <button onClick={() => setIsAdding(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className={s.cards}>
        {cards.map((card) => (
          <Card
            key={card.number}
            {...card}
            onDelete={deleteCard}
            isActive={activeCardId === card.number}
            setActiveCardId={setActiveCardId}
          />
        ))}
      </div>
    </div>
  );
}

export default CardGrid;
