// Import libary
import React, { useState } from 'react';

// Import ant design  components
import { Button, Input, message, Spin, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

// Import componets
import TwitteGroup from '../TwitteGroup.js';
// Import Services
import { fetchTwitter } from '../../services/api';

// Import style sheets
import './style.css';

const { TextArea } = Input;
const SearchArea = (props) => {
  const [form] = Form.useForm();
  const [twiteData, setTwiteData] = useState({});
  const [loading, setLoading] = useState(false);
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  const handleSubmit = async (values) => {
    const { text } = values;
    try {
      setLoading(true);

      const res = await fetchTwitter({ data: text });
      const { data } = res || {};
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
        <Form
          form={form}
          name='search-form'
          onFinish={handleSubmit}
          {...layout}
          layout='vertical'
          size='large'
        >
          <Form.Item
            name='text'
            label='Text'
            rules={[{ required: true }]}
            required
          >
            <TextArea
              showCount
              autoSize={{ minRows: 3, maxRows: 6 }}
              allowClear
              placeholder='Enter the text you want to search here'
              bordered='false'
              style={{ border: ' 2px solid #f5ba13' }}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 18, span: 6 }}>
            <Button
              htmlType='submit'
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
          </Form.Item>
        </Form>
      </div>
      <div>
        {loading ? (
          <Spin />
        ) : (
          Object.keys(twiteData).map((index) => {
            const base = twiteData[index];
            return <TwitteGroup data={base} key={index} />;
          })
        )}
      </div>
    </div>
  );
};

export default SearchArea;
