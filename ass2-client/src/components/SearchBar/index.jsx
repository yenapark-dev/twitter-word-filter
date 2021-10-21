// Import libary
import React, { useState } from 'react';

// Import ant design  components
import { Row, Col, Button, Input } from 'antd';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';

// Import componets
import Keywords from '../Keywords';

// Import Services
import { fetchTwitter } from '../../services/api';

// Import style sheets
import './style.css';

const SearchArea = (props) => {
  const [input, setInput] = useState({ value: '' });
  const [keywords, setKeywords] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const submitKeyword = (event) => {
    setKeywords((prevKeyword) => {
      return [...prevKeyword, input];
    });
    setInput({ value: '' });
    event.preventDefault();
  };

  const deleteQuery = (id) => {
    setKeywords((prevQuery) => {
      return prevQuery.filter((query, index) => {
        return index !== id;
      });
    });
  };
  const handleSubmit = () => {
    fetchTwitter(JSON.stringify(keywords));
  };

  return (
    <div className='search-area'>
      <Row className='action'>
        {/* Add keyword input */}
        <Col span={8}>
          <Input
            className='add-keyword'
            name='value'
            onChange={handleChange}
            onPressEnter={submitKeyword}
            suffix={
              <PlusCircleOutlined
                style={{ color: ' #f5ba13', fontSize: '2em' }}
              />
            }
            allowClear
            maxLength='512'
            placeholder='Enter your query here'
            value={input.value}
          />
        </Col>
        <Col span={8} />
        {/* Search button */}
        <Col span={8}>
          <Button
            block
            icon={<SearchOutlined />}
            onClick={handleSubmit}
            size='large'
            type='text'
            style={{
              height: '60px',
              borderRadius: '7px',
              boxShadow: '0 1px 5px rgb(138, 137, 137) ',
              backgroundColor: ' #f5ba13',
              fontSize: '1.2em',
            }}
          >
            Search
          </Button>
        </Col>
      </Row>
      <Row className='keywords-area'>
        {keywords.map((keyword, index) => {
          return (
            <Keywords
              key={index}
              id={index}
              name={keyword.value}
              content={keyword.value}
              onDelete={deleteQuery}
            />
          );
        })}
      </Row>
    </div>
  );
};

export default SearchArea;
