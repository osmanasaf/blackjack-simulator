import React, { useState, useEffect } from 'react';
import PlayerArea from './PlayerArea';
import DealerArea from './DealerArea';
import { CardManager } from './logic/CardManager'; 
import './styles/GameBoard.css';

const cardManager = new CardManager();

function GameBoard() {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [cardCount, setCardCount] = useState(0); // Kart sayımını tutacak state

  useEffect(() => {
    // Dealer'a kart eklendiğinde kart sayımını güncelle
    const updateCount = dealerCards.reduce((count, card) => {
      cardManager.updateCount(card); // Her kart için sayımı güncelle
      return cardManager.count; // Güncellenmiş sayımı döndür
    }, cardManager.count);

    setCardCount(updateCount); // State'i güncellenmiş kart sayımı ile güncelle
  }, [dealerCards]);

  const togglePlayerSelection = (playerId) => {
    setSelectedPlayers(prev => {
      const isSelected = prev.includes(playerId);
      if (isSelected) {
        return prev.filter(id => id !== playerId);
      } else {
        return prev.length < 3 ? [...prev, playerId] : prev;
      }
    });
  };

  const addCardToDealer = (card) => {
    setDealerCards([...dealerCards, card]); // Dealer'a kart ekle
    // Kart sayımı useEffect içinde güncellenecek
  };

  return (
    <div className="gameBoard">
      <DealerArea cardManager={cardManager} addCardToDealer={addCardToDealer} />
      <div className="playerAreas">
        {[...Array(7).keys()].map((i) => (
          <PlayerArea
            key={i}
            playerId={i + 1}
            isSelected={selectedPlayers.includes(i + 1)}
            togglePlayerSelection={togglePlayerSelection}
            cardManager={cardManager}
            addCard={(playerId, card) => {
              // Bu kısımda oyunculara kart eklemek yerine, kart sayımı yapılabilir
            }}
          />
        ))}
      </div>
      {/* Kart sayımını göster */}
      <div>Kart Sayımı: {cardCount}</div>
    </div>
  );
}

export default GameBoard;
