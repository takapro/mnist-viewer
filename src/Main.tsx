import React from 'react';
import ImageData from './ImageData';
import ImageView from './ImageView';
import Network from './Network';

const Main = (props: { data: ImageData[], network: Network }): JSX.Element => {
  return (
    <>
      <div className='images'>
        {props.data.map((each, index) => <ImageView key={index} data={each} />)}
      </div>
    </>
  );
};

export default Main;
