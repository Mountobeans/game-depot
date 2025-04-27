import React, {useState} from 'react';
import {motion} from 'framer-motion'
import "./single-card.style.css"


const Card = ({ front, back, toyKey, isFlipped, isMatched, handleClick }) => {
  // const [isFlipped, setIsFlipped] = useState(false);
  // const [isFocused, setIsFocused] = useState(false);
 

  return (
    <motion.div
    className = 'card-wrapper'
    //  ${isFocused ? 'focused' : ''}`}
    onClick = {() => handleClick(toyKey)}
    animate = {{
      rotateY: isFlipped ? 180 : 0,
      // position: isFocused ? 'fixed' : 'relative',
      // top: isFocused ? '50%' : '0',
      // left: isFocused ? '50%' : '0',
      // x: isFocused ? '-50%' : '0',
      // y: isFocused ? '-50%' : '0',
      // width: isFocused ? '90vw' : '150px',
      // height: isFocused ? '90vh' : '150px',
      // zIndex: isFocused ? 1000 : 1, 
    }}
    transition = {{ duration: .6 }}
    style = {{
      transformStyle: 'preserve-3d',
      cursor: 'pointer'
    }}
    >
             {/* Front of the card */}
             <motion.div
        className="card-face card-front"
        style={{
          backfaceVisibility: 'hidden',
          // position: 'absolute',
          // width: '100%',
          // height: '100%',
        }}
      >
        {front}
      </motion.div>

      {/* Back of the card */}
      <motion.div
        className="card-face card-back"
        style={{
          transform: 'rotateY(180deg)',  // Flip the back 180 degrees
          backfaceVisibility: 'hidden',
          // position: 'absolute',
          // width: '100%',
          // height: '100%',
        }}
      >
        {back}
      </motion.div>
    </motion.div>
  );
};

export default Card