// Import ant design  components
import React, { useState, useEffect } from 'react';
import { List, Skeleton, Divider, Card } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

const TwitteGroup = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    setData(props.data);
    setLoading(false);
  };
  useEffect(() => {
    loadMoreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Card
        title={props.data[1].keyword}
        bordered={false}
        style={{ width: '35%' }}
      >
        <div
          id='scrollableDiv'
          style={{
            height: 400,
            overflow: 'auto',
            padding: '0 16px',
            border: '1px solid rgba(140, 140, 140, 0.35)',
          }}
        >
          <InfiniteScroll
            dataLength={data.length}
            next={loadMoreData}
            hasMore={data.length < 30}
            loader={<Skeleton paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget='scrollableDiv'
          >
            <List
              dataSource={data}
              renderItem={(item) => (
                <List.Item key={item.keywords}>
                  <List.Item.Meta
                    title={item.text}
                    description={`${item.retweet} Retweet ${item.favorite} Like`}
                  />
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      </Card>
    </div>
  );
};

export default TwitteGroup;
