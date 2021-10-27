// Import libray
import React, { useState } from 'react';

// Import ant design style sheet
import 'antd/dist/antd.css';

// Import components
import SearchBar from './components/SearchBar';

// Import style sheet
import './App.css';
import TwitteGroup from './components/TwitteGroup.js/index.js';

function App() {
  const [twiteData, setTwiteData] = useState({});
  const [keywords, setKeywords] = useState();

  const handdleSearch = async (data, keywords) => {
    setTwiteData(data);
    setKeywords(keywords);
  };

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

      <SearchBar onSearch={handdleSearch} />

      {Object.keys(twiteData).map((index) => {
        const base = twiteData[index];
        return <TwitteGroup data={base} key={index} />;
      })}
    </div>
  );
}

export default App;
