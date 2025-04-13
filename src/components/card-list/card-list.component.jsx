import React, {useState, useEffect} from 'react';
import toys from "../../toylist.data";
import "./card-list.style.css";
import Card from "../card-component/single-card.component"

const MatchMessage = ({toyCards, setToyCards, setShowModal}) => {
      
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
      setShowModal(false)          
    }}
 > 
 {isMatch ? "You Got A Match!" : "Try Again!"}
  </div>
  )}

const CardList = () => {

  const [showModal, setShowModal] = useState(false)

  const [toyCards, setToyCards] = useState(() => {
    return toys.map(toy => ({
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
      }

    }, [toyCards])

    // const checkForMatch = function(selectedCards) {
      
      
      
  


  return (
    <div className="card-list">
      {toyCards.map((toy) => {

        const {isFlipped, isMatched, key, name, image} = toy

        return (
          <>
          {showModal && <MatchMessage setShowModal = {setShowModal} setToyCards = {setToyCards} toyCards={toyCards} />}
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
