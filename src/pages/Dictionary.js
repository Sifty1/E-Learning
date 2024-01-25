import axios from 'axios';
import React, { useState } from 'react';
import tarinBackground from "../assets/tarin.png";
import "../styles/Dictionary.css";

function Dictionary() {
  const [word, setWord] = useState('hello');
  const [dictionaryData, setDictionaryData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDictionaryData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      console.log('API Response:', response.data);
      setDictionaryData(response.data[0]);
    } catch (error) {
      console.error('Error fetching dictionary data:', error);
      setDictionaryData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="Dictionary" style={{ backgroundImage: `url(${tarinBackground})` }}>
      <div className="search-container">
        <label>
          Enter a word:
          <input type="text" value={word} onChange={(e) => setWord(e.target.value)} />
        </label>
        <button onClick={fetchDictionaryData}>Search</button>
      </div>

      <div className="results-container">
        {isLoading && <p>Loading...</p>}

        {!isLoading && dictionaryData && (
          <>
            <h2>{dictionaryData.word}</h2>
            {dictionaryData.meanings.map((meaning, index) => (
              <div key={index}>
                <h3>{meaning.partOfSpeech}</h3>
                <ul>
                  {meaning.definitions.map((definition, idx) => (
                    <li key={idx}>{definition.definition}</li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        )}

        {!isLoading && !dictionaryData && <p>No results found.</p>}
      </div>
    </div>
  );
}

export default Dictionary;
