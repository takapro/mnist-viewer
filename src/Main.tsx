import React, { useState } from 'react';
import Draw from './Draw';
import SampleData, { normalizedImage } from './SampleData';
import SampleCell from './SampleCell';
import Network, { predict } from './Network';

const calculate = (network: Network, data: SampleData): string => {
  const result = predict(network, normalizedImage(data));
  const indexes = Array.from({ length: result.length }, (v, i) => i);
  indexes.sort((i, j) => result[j] - result[i]);
  return indexes.slice(0, 3).map(i => `${i}: ${result[i]}`).join('\n');
};

const Main = (props: { data: SampleData[], network: Network }): JSX.Element => {
  const [selection, setSelection] = useState(null as SampleData | null);
  const result = selection ? calculate(props.network, selection) : '---\n---\n---';
  return (
    <>
      <Draw setData={setSelection} />
      <SampleCell data={selection} />
      <pre className='result'>{result}</pre>
      <div className='images'>
        {props.data.map(each =>
          <SampleCell key={each.id} data={each} onClick={() => setSelection(each)} />)}
      </div>
    </>
  );
};

export default Main;
