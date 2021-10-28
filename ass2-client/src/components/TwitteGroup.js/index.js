// Import ant design  components
import React from 'react';
import { List, Skeleton, Divider, Card } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

const TwitteGroup = (props) => {
  const { data: tweetData, idx } = props;

  return (
    <div>
      <Card
        title={idx + 1 + ' ' + props.data[1].keyword}
        bordered={false}
        style={{ width: '80%' }}
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
            dataLength={tweetData.length}
            next={tweetData}
            hasMore={tweetData.length < 30}
            loader={<Skeleton paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget='scrollableDiv'
          >
            <List
              dataSource={tweetData}
              renderItem={(item, index) => (
                <List.Item key={index}>
                  {item.text ? (
                    <List.Item.Meta
                      title={item.text}
                      description={`${item.retweet} Retweet ${item.favorite} Like`}
                    />
                  ) : null}
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
