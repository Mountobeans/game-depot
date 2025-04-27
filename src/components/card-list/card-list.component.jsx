import React, {useState, useEffect} from 'react';
import toys from "../../toylist.data";
import storyItems from "../../kingtube.data";
import "./card-list.style.css";
import Card from "../card-component/single-card.component"

const MatchMessage = ({cards, setCards, setShowModal, tries, gameOver}) => {
      
  const selectedCards = cards.filter(card => card.isFlipped && !card.isMatched)
  const isMatch = (selectedCards[0]?.match === selectedCards[1]?.match)
  return (
 <div className = "match-message"
      onClick = {() => {
        if (!isMatch) {
          setCards(prevCards => 
          prevCards.map(card =>
            selectedCards.some(selected => selected.key === card.key) ?
          {...card, 
          isFlipped: false}
          : card
        ))
      }
      else {
        setCards(prevCards => 
          prevCards.map(card => 
            selectedCards.some(selected => selected.key === card.key) ?
          {...card, 
          isMatched: true}
          : card
        )
      );
    }
      if(!gameOver) setShowModal(false)          
    }}
 > 
{gameOver ? (
  tries === 0 ? (
    <>
      You Lose!
      <br />
      {/* Tries: {tries} */}
    </>
  ) : (
    <>
      You Win!
      <br />
      {/* Tries: {tries} */}
    </>
  )
) : isMatch ? (
  <>
    You Got A Match!
    <br />
    {/* Tries: {tries} */}
  </>
) : (
  <>
    Try Again!
    <br />
    {/* Tries: {tries} */}
  </>
)}
  </div>
  )}

const CardList = () => {

  function shuffleArray(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  const [showModal, setShowModal] = useState(false)
  const [tries, setTries] = useState(20)
  const [gameOver, setGameOver] = useState(false)
  const isDivided = true

  const [cards, setCards] = useState(() => {
  const shuffledToys = shuffleArray(storyItems)
  return shuffledToys.map(toy => ({
      key: toy.key,
      image: toy.image,
      name: toy.name,
      match: toy.match,
      isFlipped: false,
      isMatched: false
    }));
  })

  // const nameCards = cards.filter(card => card.name);
  // const imageCards = cards.filter(card => card.image);
  

  

  
  const handleClick = (cardKey) => {
  if (!showModal) {
      setCards(prevCards => 
        prevCards.map(card => {
          if (card.key === cardKey) {
            if (!card.isMatched) {
              return {...card, isFlipped: true}
            }
          }
          return card;
        })
      )
    }
    console.log(cardKey)
    }
    
    useEffect(() => {
      const selectedCards = cards.filter(card => card.isFlipped && !card.isMatched)

      if (selectedCards.length === 2) {
        setShowModal(true)
        const selectedCards = cards.filter(card => card.isFlipped && !card.isMatched)
        const isMatch = (selectedCards[0]?.match === selectedCards[1]?.match)
        // if(!isMatch) setTries(prev => prev-1)
      }

    }, [cards])

    useEffect(() => {
      const allMatched = cards.every(card => card.isMatched);
      if (!gameOver && (tries === 0 || allMatched)) {
        setGameOver(true);
        setShowModal(true);
      }
    }, [tries, cards, gameOver]);

    // const checkForMatch = function(selectedCards) {
      

  return (
    <div className="card-list">
      {showModal && <MatchMessage setShowModal = {setShowModal} setCards = {setCards} cards={cards} tries = {tries} gameOver = {gameOver} />}

      {cards.filter(card => card.image).map(({isFlipped, isMatched, key, name, image}) => {

        return (
          <>
        <Card
          key={key}
          cardKey = {key}
          front={<div>?</div>}
          back={
            <>
              {name && <h3>{name}</h3>}
              {image && (
                <img src={image} alt={name} style={{ width: "100%" }} />
              )}
            </>
          }
          isFlipped = {isFlipped}
          handleClick = {() => handleClick(key)}
          isMatched = {isMatched}
        />
        </>
        )
      })}
      {isDivided && <div className="red-line"></div>}
      {cards.filter(card => card.name).map(({isFlipped, isMatched, key, name, image}) => {

        return (
          <>
        <Card
          key={key}
          cardKey = {key}
          front={<div>?</div>}
          back={
            <>
              {name && <h3>{name}</h3>}
              {image && (
                <img src={image} alt={name} style={{ width: "100%" }} />
              )}
            </>
          }
          isFlipped = {isFlipped}
          handleClick = {() => handleClick(key)}
          isMatched = {isMatched}
        />
        </>
        )
      })}
    </div>
  );
};

export default CardList;
