import React, { useState } from 'react';
import "../styles/Quiz.css";

const alphabetWords = {
  A: ['Apple', 'Ant', 'Astronaut'],
  B: ['Banana', 'Butterfly', 'Ball'],
  C: ['Cat', 'Carrot', 'Cloud'],
  D: ['Dog', 'Dolphin', 'Diamond'],
  E: ['Elephant', 'Eagle', 'Earth'],
  F: ['Fish', 'Flower', 'Fire'],
  G: ['Giraffe', 'Guitar', 'Globe'],
  H: ['Horse', 'Hat', 'Heart'],
  I: ['Ice Cream', 'Island', 'Insect'],
  J: ['Jellyfish', 'Jacket', 'Jungle'],
  K: ['Kangaroo', 'Kite', 'Key'],
  L: ['Lion', 'Lemon', 'Leaf'],
  M: ['Monkey', 'Moon', 'Mountain'],
  N: ['Nest', 'Ninja', 'Notebook'],
  O: ['Owl', 'Orange', 'Ocean'],
  P: ['Penguin', 'Pizza', 'Piano'],
  Q: ['Quill', 'Queen', 'Question'],
  R: ['Rabbit', 'Rainbow', 'Rocket'],
  S: ['Sun', 'Star', 'Ship'],
  T: ['Tiger', 'Tree', 'Train'],
  U: ['Umbrella', 'Unicorn', 'Umbrella'],
  V: ['Volcano', 'Violin', 'Vegetable'],
  W: ['Whale', 'Watermelon', 'Watch'],
  X: ['Xylophone', 'X-ray', 'Xerox'],
  Y: ['Yak', 'Yo-yo', 'Yarn'],
  Z: ['Zebra', 'Zipper', 'Zoo'],
};

const Quiz = () => {
  const [currentLetter, setCurrentLetter] = useState('A');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);

  const currentWordData = alphabetWords[currentLetter][currentWordIndex];
  const options = [currentWordData, ...alphabetWords[currentLetter].filter((word) => word !== currentWordData)];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextWord = () => {
    setShowExplanation(true);
  };

  const handleContinue = () => {
    setSelectedOption('');
    setShowExplanation(false);

    if (currentWordIndex < alphabetWords[currentLetter].length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      const nextLetter = String.fromCharCode(currentLetter.charCodeAt(0) + 1);
      setCurrentLetter(nextLetter);
      setCurrentWordIndex(0);
    }
  };

  const isCorrect = selectedOption === currentWordData;

  return (
    <div className="quiz-container">
      <div className="question-container">
        <h1>{currentWordData}</h1>
        <div className="options-container">
          {options.map((option, index) => (
            <button
              key={index}
              className={`option ${selectedOption === option ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option)}
              disabled={showExplanation}
            >
              {option}
            </button>
          ))}
        </div>
        <button
          className="submit-button"
          onClick={handleNextWord}
          disabled={!selectedOption || showExplanation}
        >
          Submit Answer
        </button>
      </div>
      {showExplanation && (
        <div className="explanation-container">
          {isCorrect ? (
            <>
              <p>Correct! Well done!</p>
              <button className="continue-button" onClick={handleContinue}>
                Continue to Next Word
              </button>
            </>
          ) : (
            <>
              <p>Oops! That's incorrect. Try again!</p>
              <button className="continue-button" onClick={() => setShowExplanation(false)}>
                Try Again
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
