// Word.js
import React, { useEffect, useState } from 'react';
import cowBackground from "../assets/cow.png"; // Import the cow.png image
import "../styles/Word.css";

const Word = () => {
  const maxAttempts = 6;

  const [hiddenWord, setHiddenWord] = useState('');
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(maxAttempts);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetchWord();
  }, []);

  const fetchWord = async () => {
    try {
      const response = await fetch('https://api.datamuse.com/words?ml=game&max=1');
      const data = await response.json();

      if (data && data.length > 0) {
        setHiddenWord(data[0].word.toLowerCase());
      }
    } catch (error) {
      console.error('Error fetching word:', error);
    }
  };

  const handleGuessChange = (event) => {
    const value = event.target.value.toLowerCase().replace(/[^a-z]/g, ''); // Allow only letters
    setGuess(value);
  };

  const handleKeyboardClick = (letter) => {
    setGuess(guess + letter);
  };

  const handleClearClick = () => {
    setGuess('');
  };

  const handleGuessSubmit = () => {
    if (guess.length === hiddenWord.length) {
      let newFeedback = '';
      for (let i = 0; i < hiddenWord.length; i++) {
        if (hiddenWord.includes(guess[i])) {
          newFeedback += guess[i] === hiddenWord[i] ? 'C' : 'P';
        } else {
          newFeedback += 'X';
        }
      }

      setFeedback(newFeedback);
      setAttempts(attempts - 1);

      if (newFeedback === 'CCCCC') {
        alert('Congratulations! You guessed the word.');
        resetGame();
      } else if (attempts === 1) {
        alert(`Sorry! The correct word was ${hiddenWord}.`);
        resetGame();
      }
    } else {
      alert('Please enter a valid guess with the correct length.');
    }
  };

  const resetGame = () => {
    fetchWord();
    setGuess('');
    setAttempts(maxAttempts);
    setFeedback('');
  };

  return (
    <div className="wordle-container" style={{ backgroundImage: `url(${cowBackground})` }}>
      <h1>Wordle Adventure</h1>
      <div className="feedback">{feedback}</div>
      <div className="attempts">Attempts left: {attempts}</div>
      <div className="guess-box">
        {hiddenWord.split('').map((letter, index) => (
          <div key={index} className="guess-letter">
            {guess[index] ? guess[index] : '_'}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={guess}
        onChange={handleGuessChange}
        maxLength={hiddenWord.length}
        placeholder="Guess the word!"
      />
      <div className="keyboard">
        {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
          <button
            key={letter}
            className="keyboard-button"
            onClick={() => handleKeyboardClick(letter.toLowerCase())}
          >
            {letter}
          </button>
        ))}
      </div>
      <button onClick={handleGuessSubmit}>Submit Guess</button>
      <button className="clear-button" onClick={handleClearClick}>
        Clear
      </button>
    </div>
  );
};

export default Word;
