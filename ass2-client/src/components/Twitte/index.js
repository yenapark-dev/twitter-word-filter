// Import ant design  components
import { Row, Col } from 'antd';

// Import style sheets
import './style.css';

const Twitte = (props) => {
  const { text, retweet, favorite } = props.data;
  return (
    <div className='twitte'>
      <Row>
        <Col span={24}>
          <p>{text}</p>
        </Col>
      </Row>
      <Row>
        <Col span={4} offset={16}>
          <p>{retweet} Retweet</p>
        </Col>
        <Col span={4}>
          <p>{favorite} Like</p>
        </Col>
      </Row>
    </div>
  );
};

export default Twitte;
