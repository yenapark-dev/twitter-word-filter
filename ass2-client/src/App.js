// Import libray
import React, { useState } from 'react';

// Import ant design style sheet
import 'antd/dist/antd.css';

// Import components
import SearchBar from './components/SearchBar';
import Keyword from './components/Keywords';

// Import style sheet
import './App.css';

function App() {
  const [keywords, setKeywords] = useState([]);

  function addNote(newWord) {
    setKeywords((prevKeyword) => {
      return [...prevKeyword, newWord];
    });
  }

  function deleteNote(id) {
    setKeywords((prevKey) => {
      return prevKey.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }
  return (
    <div className='App'>
      <div className='Intro'>
        <h1>Twitter Filter Engine</h1>
        <p>
          Cloud-based query processor based on Twitter messages. It will allow
          user to enter multiple queries based on “hashtags”. With the data
          collected, the app will utilise NLP to do sentiment analysis to find
          the most related keywords related to the queries and visualise it with
          word cloud. The query will remain active until it is manually revoked
          by the user.
        </p>
      </div>

      <SearchBar onAdd={addNote} />
      {keywords.map((keyword, index) => {
        return (
          <Keyword
            key={index}
            id={index}
            name={keyword}
            content={keyword}
            onDelete={deleteNote}
          />
        );
      })}
    </div>
  );
}

export default App;
