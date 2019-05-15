import React, { useState, useEffect } from 'react';
import ImageData from './ImageData';
import ImageView from './ImageView';

type State = 'loading' | 'failed' | ImageData[];

const fetchUrl = (url: string, setState: (state: State) => void): void => {
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error();
      }
    })
    .then(json => setState(json))
    .catch(() => setState('failed'));
};

const App = (props: { baseUrl: string }): JSX.Element => {
  const [state, setState] = useState('loading' as State);
  useEffect(() => fetchUrl(props.baseUrl + '/t10k-100.json', setState), []);
  return (
    <>
      <h1>MNIST Viewer</h1>
      {state === 'loading' ? <p>Loading...</p> :
        state === 'failed' ? <p>Sorry, failed to load data.</p> :
          <div className='images'>
            {state.map((each, index) => <ImageView key={index} data={each} />)}
          </div>
      }
    </>
  );
};

export default App;
