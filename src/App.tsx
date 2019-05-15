import React, { useState, useEffect } from 'react';
import { FetchState, fetchUrl, checkStates } from './fetchUrl';
import ImageData from './ImageData';
import ImageView from './ImageView';

const App = (props: { baseUrl: string }): JSX.Element => {
  const [data, setData] = useState('loading' as FetchState<ImageData[]>);
  useEffect(() => fetchUrl(props.baseUrl + '/t10k-100.json', setData), []);
  const state: FetchState<[ImageData[]]> = checkStates(data);
  return (
    <>
      <h1>MNIST Viewer</h1>
      {state === 'loading' ? <p>Loading...</p> :
        state === 'failed' ? <p>Sorry, failed to load data.</p> :
          <div className='images'>
            {state[0].map((each, index) => <ImageView key={index} data={each} />)}
          </div>
      }
    </>
  );
};

export default App;
