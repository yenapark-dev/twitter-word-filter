// Import libary
import React, { useState } from 'react';

// Import metieral ui components
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

// Import compontent from antd
import { Button } from 'antd';

// Import style sheets
import './style.css';

const SearchArea = (props) => {
  const [input, setInput] = useState();

  const handleChange = (event) => {
    const { value } = event.target;
    setInput(value);
  };

  const submitKeyword = (values) => {
    props.onAdd(input);
    setInput('');
    values.preventDefault();
  };

  return (
    <div>
      {/* form for search bar*/}
      <form className='add-keyword'>
        <input
          name='keyword'
          onChange={handleChange}
          value={input}
          placeholder='Enter your keyword here'
        />
        <Button type='primary'>Search All</Button>
        <Fab onClick={submitKeyword}>
          <AddIcon />
        </Fab>
      </form>
    </div>
  );
};

export default SearchArea;
