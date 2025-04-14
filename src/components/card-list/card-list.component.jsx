import React, {useState, useEffect} from 'react';
import toys from "../../toylist.data";
import "./card-list.style.css";
import Card from "../card-component/single-card.component"

const MatchMessage = ({toyCards, setToyCards, setShowModal, tries, gameOver}) => {
      
  const selectedCards = toyCards.filter(card => card.isFlipped && !card.isMatched)
  const isMatch = (selectedCards[0]?.match === selectedCards[1]?.match)
  return (
 <div className = "match-message"
      onClick = {() => {
        if (!isMatch) {
          setToyCards(prevCards => 
          prevCards.map(card =>
            selectedCards.some(selected => selected.key === card.key) ?
          {...card, 
          isFlipped: false}
          : card
        ))
      }
      else {
        setToyCards(prevCards => 
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
      Tries: {tries}
    </>
  ) : (
    <>
      You Win!
      <br />
      Tries: {tries}
    </>
  )
) : isMatch ? (
  <>
    You Got A Match!
    <br />
    Tries: {tries}
  </>
) : (
  <>
    Try Again!
    <br />
    Tries: {tries}
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

  const [toyCards, setToyCards] = useState(() => {
  const shuffledToys = shuffleArray(toys);
  return shuffledToys.map(toy => ({
      key: toy.key,
      image: toy.image,
      name: toy.name,
      match: toy.match,
      isFlipped: false,
      isMatched: false
    }));
  })

  const handleClick = (toyKey) => {
  if (!showModal) {
      setToyCards(prevCards => 
        prevCards.map(card => {
          if (card.key === toyKey) {
            if (!card.isMatched) {
              return {...card, isFlipped: true}
            }
          }
          return card;
        })
      )
    }
    }
    
    useEffect(() => {
      const selectedCards = toyCards.filter(card => card.isFlipped && !card.isMatched)

      if (selectedCards.length === 2) {
        setShowModal(true)
        const selectedCards = toyCards.filter(card => card.isFlipped && !card.isMatched)
        const isMatch = (selectedCards[0]?.match === selectedCards[1]?.match)
        if(!isMatch) setTries(prev => prev-1)
      }

    }, [toyCards])

    useEffect(() => {
      const allMatched = toyCards.every(card => card.isMatched);
      if (!gameOver && (tries === 0 || allMatched)) {
        setGameOver(true);
        setShowModal(true);
      }
    }, [tries, toyCards, gameOver]);

    // const checkForMatch = function(selectedCards) {
      
      
      
  


  return (
    <div className="card-list">
      {toyCards.map((toy) => {

        const {isFlipped, isMatched, key, name, image} = toy

        return (
          <>
          {showModal && <MatchMessage setShowModal = {setShowModal} setToyCards = {setToyCards} toyCards={toyCards} tries = {tries} gameOver = {gameOver} />}
        <Card
          key={key}
          toyKey = {key}
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
          handleClick = {handleClick}
          isMatched = {isMatched}
        />
        </>
        )
      })}
    </div>
  );
};

export default CardList;
