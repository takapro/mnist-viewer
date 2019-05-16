import React, { useState, useEffect } from 'react';
import { FetchState, fetchUrl, checkStates } from './fetchUrl';
import SampleData from './SampleData';
import Network from './Network';
import Main from './Main';

const App = (props: { baseUrl: string }): JSX.Element => {
  const [data, setData] = useState('loading' as FetchState<SampleData[]>);
  const [network, setNetwork] = useState('loading' as FetchState<Network>);
  useEffect(() => fetchUrl(props.baseUrl + '/t10k-100.json', setData), []);
  useEffect(() => fetchUrl(props.baseUrl + '/mnist_weight.json', setNetwork), []);
  const state: FetchState<[SampleData[], Network]> = checkStates(data, network);
  return (
    <>
      <h1>MNIST Viewer</h1>
      {state === 'loading' ? <p>Loading...</p> :
        state === 'failed' ? <p>Sorry, failed to load data.</p> :
          <Main data={state[0]} network={state[1]} />
      }
    </>
  );
};

export default App;
