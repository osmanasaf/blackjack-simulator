export class CardManager {
    constructor() {
        this.suits = ['♦', '♣', '♥', '♠'];
        this.values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        this.resetGame();
    }

    createCard(suit, value) {
        return { suit, value };
    }

    calculateHandValue(cards) {
        let total = 0;
        let aceCount = 0;
        for (const card of cards) {
            if (card.value === 'A') {
                aceCount += 1;
                total += 11;
            } else if (['J', 'Q', 'K'].includes(card.value)) {
                total += 10;
            } else {
                total += parseInt(card.value, 10);
            }
        }
        while (total > 21 && aceCount > 0) {
            total -= 10;
            aceCount -= 1;
        }
        return total;
    }

    updateCount(card) {
        const value = card.value;
        if (['2', '3', '4', '5', '6'].includes(value)) {
            this.count++;
        } else if (['10', 'J', 'Q', 'K', 'A'].includes(value)) {
            this.count--;
        }
    }

    resetGame() {
        this.cardsPlayed = [];
        this.count = 0;
    }

    newDeck() {
        this.resetGame();
    }

    newRound() {
        // Bu metodun içinde yeni round için özel işlevler olabilir
    }

    getCount() {
        return this.count;
    }
}
