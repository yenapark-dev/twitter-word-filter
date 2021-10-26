import Twitte from '../Twitte';

const TwitteGroup = (props) => {
  return (
    <div className='twitter-group'>
      <h1>{props.data[0].keyword}</h1>
      {props.data.map((data, index) => {
        return <Twitte data={data} key={index} />;
      })}
    </div>
  );
};

export default TwitteGroup;
