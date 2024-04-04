// DealerArea.js
import React, { useState } from 'react';
import './styles/DealerArea.css';

function DealerArea({ cardManager }) {
  const [selectedSuit, setSelectedSuit] = useState(cardManager.suits[0]);
  const [selectedValue, setSelectedValue] = useState(cardManager.values[0]);
  const [dealerCards, setDealerCards] = useState([]);

  const handleAddCard = () => {
    if (cardManager.calculateHandValue(dealerCards) < 17) {
      const card = cardManager.createCard(selectedSuit, selectedValue);
      const newDealerCards = [...dealerCards, card];
      if (cardManager.calculateHandValue(newDealerCards) <= 21) {
        setDealerCards(newDealerCards);
      } else {
        alert("Dealer eli 21'i aştı!");
      }
    } else {
      alert("Dealer'ın el değeri 17 veya üzeri. Daha fazla kart eklenemez!");
    }
  };

  return (
    <div className="dealerArea">
      <h2>Dealer</h2>
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
      <div>Kartlar: {dealerCards.map((card, index) => <div key={index}>{`${card.value} ${card.suit}`}</div>)}</div>
    </div>
  );
}

export default DealerArea;
