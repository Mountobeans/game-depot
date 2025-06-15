import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import CardList from './components/card-list/card-list.component'; // Assuming this is the Card Game component
import PictureReveal from './components/picture-reveal/PictureReveal.component'; // Assuming this is another game
import CrossWord from './components/crossword/crossword.component'; // Assuming this is another game
import GPTCrossWord from './components/GPTCrossWord/gpt-crossword.component'; // Assuming this is another game

function App() {
  return (
    <Router>
      <div className="App">
        {/* Home Page (only visible at '/') */}
        <Routes>
          <Route
            path="/"
            element={
              <header className="App-header">
                <h1>Game Center</h1>

                {/* Navigation links */}
                <div className="button-container">
                  <Link to="/card-game" className="button-53">
                    Memory
                  </Link>
                  <Link to="/picture-reveal" className="button-53 second-53">
                    Image Reveal
                  </Link>
                  <Link to="/crossword-puzzle" className="button-53 second-53">
                    Crossword
                  </Link>
                  <Link to="/gpt-crossword-puzzle" className="button-53 second-53">
                    GPTCrossword
                  </Link>
                </div>
              </header>
            }
          />

          <Route path="/card-game" element={
            <div className="game-container">
                <CardList />
           </div>} />
          <Route path="/picture-reveal" element={
            <div className="game-container">
                <PictureReveal />
           </div>} />
          <Route path="/crossword-puzzle" element={
            <div className="game-container">
                <CrossWord />
           </div>} />
          <Route path="/gpt-crossword-puzzle" element={
            <div className="game-container">
                <GPTCrossWord />
           </div>} />

         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
