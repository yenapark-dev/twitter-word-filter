// Import libary
import React from 'react';

// Import metieral ui components
import DeleteIcon from '@material-ui/icons/Delete';

// Import style sheets
import './style.css';

const Keywords = (props) => {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className='keywords'>
      <h1>{props.content}</h1>

      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
};

export default Keywords;
