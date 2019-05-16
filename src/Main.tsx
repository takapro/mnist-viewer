import React, { useState } from 'react';
import ImageData from './ImageData';
import ImageView from './ImageView';
import Network, { predict } from './Network';

const calculate = (network: Network, data: ImageData): string => {
  const buffer = window.atob(data.data);
  const array = Array.from({ length: buffer.length }, (v, i) => buffer.charCodeAt(i) / 255.0);
  const result = predict(network, array);
  const indexes = Array.from({ length: result.length }, (v, i) => i);
  indexes.sort((i, j) => result[j] - result[i]);
  return indexes.slice(0, 3).map(i => `${i}: ${result[i]}`).join('\n');
};

const Main = (props: { data: ImageData[], network: Network }): JSX.Element => {
  const [selection, setSelection] = useState(null as ImageData | null);
  const result = selection ? calculate(props.network, selection) : '---\n---\n---';
  return (
    <>
      <ImageView data={selection} />
      <pre className='result'>{result}</pre>
      <div className='images'>
        {props.data.map((each, index) =>
          <ImageView key={index} data={each} onClick={() => setSelection(each)} />)}
      </div>
    </>
  );
};

export default Main;
