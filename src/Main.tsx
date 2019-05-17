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

const filterData = (filter: string, data: SampleData[]): SampleData[] => {
  if (filter === 'first') {
    return data.slice(0, 100);
  } else if (filter === 'error') {
    return data.filter(each => each.label !== each.result);
  } else {
    const label = parseInt(filter);
    return data.filter(each => each.label === label);
  }
};

const Main = (props: { data: SampleData[], network: Network }): JSX.Element => {
  const [filter, setFilter] = useState('first');
  const [selection, setSelection] = useState(null as SampleData | null);
  const result = selection ? calculate(props.network, selection) : '---\n---\n---';
  return (
    <>
      <Draw setData={setSelection} />
      <SampleCell data={selection} />
      <pre className='result'>{result}</pre>
      <div className='filter'>
        <span>Filter: </span>
        <select onChange={event => setFilter(event.target.value)}>
          <option value='first'>First</option>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(each =>
            <option key={each} value={each}>{each}</option>)}
          <option value='error'>Error</option>
        </select>
      </div>
      <div className='images'>
        {filterData(filter, props.data).map(each =>
          <SampleCell key={each.id} data={each} onClick={() => setSelection(each)} />)}
      </div>
    </>
  );
};

export default Main;
