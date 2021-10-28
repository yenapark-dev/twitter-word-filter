// Import ant design  components
import React from 'react';
import { List, Skeleton, Divider, Card } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

// Import style sheets
import './styles.css';
const TwitteGroup = (props) => {
  const { data: tweetData, idx } = props;

  return (
    <div className='twitte-card'>
      <Card
        title={idx + 1 + ': ' + props.data[1].keyword}
        bordered={false}
        style={{ width: '100%', backgroundColor: 'rgba(245,186,19, 0.20)' }}
      >
        <div
          id='scrollableDiv'
          style={{
            height: 400,
            overflow: 'auto',
            padding: '0 16px',
            border: '1px solid rgba(140, 140, 140, 0.35)',
            backgroundColor: 'white',
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
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 3,
                lg: 3,
                xl: 3,
                xxl: 5,
              }}
              style={{}}
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
