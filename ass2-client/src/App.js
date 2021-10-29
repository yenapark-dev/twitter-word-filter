// Import libray
import React, { useState } from 'react';

// Import ant design style sheet
import 'antd/dist/antd.css';
import { Radio } from 'antd';
// Import components
import HashTagSearch from './components/HashTagSearch';
import TextSearch from './components/TextSearch';
// Import style sheet
import './App.css';

function App() {
  const [searchBy, setSearchBy] = useState('hashtag');
  const handdleOnChange = (event) => {
    console.log(event.target.value);
    setSearchBy(event.target.value);
  };
  console.log(searchBy);
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
      <div>
        <Radio.Group onChange={handdleOnChange}>
          <Radio.Button value='text' key='text'>
            Text
          </Radio.Button>
          <Radio.Button value='hashtag' key='hashtag'>
            Hashtag
          </Radio.Button>
        </Radio.Group>
      </div>

      {searchBy === 'text' ? <TextSearch /> : <HashTagSearch />}
    </div>
  );
}

export default App;
