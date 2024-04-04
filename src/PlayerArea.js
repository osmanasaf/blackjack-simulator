import React, { useState } from 'react';
import './styles/PlayerArea.css';

function PlayerArea({ playerId, isSelected, togglePlayerSelection, cardManager, addCardToGame }) {
  const [selectedSuit, setSelectedSuit] = useState(cardManager.suits[0]);
  const [selectedValue, setSelectedValue] = useState(cardManager.values[0]);
  const [cards, setCards] = useState([]);

  const handleAddCard = () => {
    const card = cardManager.createCard(selectedSuit, selectedValue);
    cardManager.updateCount(card); // Kart sayımını güncelle
    addCardToGame(card); // GameBoard'da tanımlanacak genel kart ekleme fonksiyonu
    const newHandValue = cardManager.calculateHandValue([...cards, card]);
    if (newHandValue <= 21) {
      setCards([...cards, card]);
    } else {
      alert("El değeri 21'i aştı. Bu kart eklenemez!");
    }
  };

  return (
    <div className={`playerArea ${isSelected ? 'selected' : ''}`} onClick={() => togglePlayerSelection(playerId)}>
      <h3>Oyuncu {playerId}</h3>
      <div className="cardSelectors">
        <select value={selectedSuit} onChange={e => setSelectedSuit(e.target.value)}>
          {cardManager.suits.map(suit => (
            <option key={suit} value={suit}>{suit}</option>
          ))}
        </select>
        <select value={selectedValue} onChange={e => setSelectedValue(e.target.value)}>
          {cardManager.values.map(value => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
        <button onClick={handleAddCard}>Kart Ekle</button>
      </div>
      <div className="cardsDisplay">
        {cards.map((card, index) => <div key={index}>{`${card.value} ${card.suit}`}</div>)}
      </div>
    </div>
  );
}

export default PlayerArea;
