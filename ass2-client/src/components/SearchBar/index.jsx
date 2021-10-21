// Import libary
import React, { useState } from 'react';

// Import metieral ui components
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Keywords from '../Keywords';

// Import style sheets
import './style.css';

const SearchArea = (props) => {
  const [input, setInput] = useState();
  const [keywords, setKeywords] = useState([]);

  const handleChange = (event) => {
    const { value } = event.target;
    setInput(value);
  };

  const submitKeyword = (values) => {
    setKeywords((prevKeyword) => {
      return [...prevKeyword, input];
    });
    setInput('');
    values.preventDefault();
  };

  const deleteQuery = (id) => {
    setKeywords((prevQuery) => {
      return prevQuery.filter((query, index) => {
        return index !== id;
      });
    });
  };

  return (
    <div className='search-area'>
      {/* form for search bar*/}
      <form className='add-keyword'>
        <input
          name='keyword'
          onChange={handleChange}
          value={input}
          placeholder='Enter your keyword here'
        />

        <Fab onClick={submitKeyword}>
          <AddIcon />
        </Fab>
      </form>
      {keywords.map((keyword, index) => {
        return (
          <Keywords
            key={index}
            id={index}
            name={keyword}
            content={keyword}
            onDelete={deleteQuery}
          />
        );
      })}
    </div>
  );
};

export default SearchArea;
