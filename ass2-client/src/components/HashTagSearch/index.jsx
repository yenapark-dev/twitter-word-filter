// Import libary
import React, { useState } from 'react';

// Import ant design  components
import { Row, Col, Button, Input, message, Spin } from 'antd';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';

// Import componets
import Keywords from '../Keywords';
import TwitteGroup from '../TwitteGroup.js';

// Import Services
import { fetchTwitterHashtag } from '../../services/api';

// Import style sheets
import './style.css';

const HashTagSearch = () => {
  const [input, setInput] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [twiteData, setTwiteData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { value } = event.target;
    setInput(value);
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

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await fetchTwitterHashtag(keywords);
      const { data } = res || {};
      console.log(data);
      setTwiteData(data);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className='search-area'>
        <Row>
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
              size='large'
              style={{
                height: '60px',
                borderRadius: '7px',
                boxShadow: '0 1px 5px rgb(138, 137, 137) ',
              }}
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
          {keywords
            ? keywords.map((keyword, index) => {
                return (
                  <Keywords
                    key={index}
                    id={index}
                    name={keyword}
                    content={keyword}
                    onDelete={deleteQuery}
                  />
                );
              })
            : null}
        </Row>
      </div>
      <div>
        {loading ? (
          <Spin />
        ) : (
          twiteData.length > 0 &&
          twiteData.map((twit, idx) => <TwitteGroup data={twit} idx={idx} />)
        )}
      </div>
    </div>
  );
};

export default HashTagSearch;
