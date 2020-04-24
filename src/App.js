import React from 'react';
import './App.css';
import {useState} from 'react';
import shuffle from 'shuffle-array';
import Navbar from './Navbar';
import Card from './Card';

// A card can be in 1 of 3 CardStates
// HIDING - the card is not being shown
// SHOWING - the card is being shown but does not have a match yet
// MATCHING - the card is being shown and has a match.
//            the card should never move from MATCHING to another state during
//            game play.
const CardState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHING: 2
}

function MemoryGame() {
  let defaultCards = [
    {id: 0, cardState: CardState.HIDING, backgroundColor: 'red'},
    {id: 1, cardState: CardState.HIDING, backgroundColor: 'red'},
    {id: 2, cardState: CardState.HIDING, backgroundColor: 'navy'},
    {id: 3, cardState: CardState.HIDING, backgroundColor: 'navy'},
    {id: 4, cardState: CardState.HIDING, backgroundColor: 'green'},
    {id: 5, cardState: CardState.HIDING, backgroundColor: 'green'},
    {id: 6, cardState: CardState.HIDING, backgroundColor: 'yellow'},
    {id: 7, cardState: CardState.HIDING, backgroundColor: 'yellow'},
    {id: 8, cardState: CardState.HIDING, backgroundColor: 'black'},
    {id: 9, cardState: CardState.HIDING, backgroundColor: 'black'},
    {id: 10, cardState: CardState.HIDING, backgroundColor: 'purple'},
    {id: 11, cardState: CardState.HIDING, backgroundColor: 'purple'},
    {id: 12, cardState: CardState.HIDING, backgroundColor: 'pink'},
    {id: 13, cardState: CardState.HIDING, backgroundColor: 'pink'},
    {id: 14, cardState: CardState.HIDING, backgroundColor: 'lightskyblue'},
    {id: 15, cardState: CardState.HIDING, backgroundColor: 'lightskyblue'}
  ];
  const Cards = shuffle(defaultCards);
  const [allCards, setAllCards] = useState(Cards);
  const [noClick, setNoClick] = useState(false);

  //this.handleClick = this.handleClick.bind(this);
  //this.handleNewGame = this.handleNewGame.bind(this);

  function handleNewGame () {
    let cards1 = allCards.map(c => ({
      ...c,
      cardState: CardState.HIDING
    }));
    cards1 = shuffle(cards1);
    setAllCards(cards1);
    //this.setState({cards});
  }

  function handleClick(id) {
    const mapCardState = (cards, idsToChange, newCardState) => {
      return cards.map(c => {
        if (idsToChange.includes(c.id)) {
          return {
            ...c,
            cardState: newCardState
          };
        }
        return c;
      });
    }

    const foundCard = allCards.find(c => c.id === id);
    
    if (noClick || foundCard.cardState !== CardState.HIDING) {
      return;
    }
    
     setNoClick(false);
    
    let cards = mapCardState(allCards, [id], CardState.SHOWING);
    
    const showingCards =  cards.filter((c) => c.cardState === CardState.SHOWING);
    
    const ids = showingCards.map(c => c.id);
    
    if (showingCards.length === 2 &&
        showingCards[0].backgroundColor === showingCards[1].backgroundColor) {
      cards = mapCardState(cards, ids, CardState.MATCHING);
    } else if (showingCards.length === 2) {
      let hidingCards = mapCardState(cards, ids, CardState.HIDING);
      
      setNoClick(true);
      
      this.setState({cards, noClick}, () => {
        setTimeout(() => {
          // set the state of the cards to HIDING after 1.3 seconds
          //this.setState({cards: hidingCards, noClick: false});
          setAllCards(hidingCards);
          setNoClick(false);
        }, 1300);
      });
      return;
    }
    
    //this.setState({cards, noClick});
    setAllCards(cards);
    setNoClick(false);
  }

  const display = allCards.map((card) => (
    <Card
      key={card.id}
      showing={card.cardState !== CardState.HIDING}
      backgroundColor={card.backgroundColor}
      oncClick={() => handleClick(card.id)}
      />
  ));
  
  return (
    <div>
      <Navbar onNewGame={handleNewGame}/>
      {display}
    </div>
  );
}

export default MemoryGame;
