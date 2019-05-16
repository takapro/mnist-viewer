import React from 'react';
import SampleData, { sampleWidth, sampleHeight } from './SampleData';

const gray = Array.from({ length: 256 }, (v, i) => `rgb(${i},${i},${i})`);

const drawData = (canvas: HTMLCanvasElement, data: SampleData | null): void => {
  const context = canvas.getContext('2d');
  if (context) {
    if (data === null) {
      context.fillStyle = gray[240];
      context.fillRect(0, 0, sampleWidth, sampleHeight);
      return;
    }
    const buffer = window.atob(data.data);
    for (let y = 0; y < sampleWidth; y++) {
      for (let x = 0; x < sampleHeight; x++) {
        context.fillStyle = gray[buffer.charCodeAt(x + y * sampleWidth)];
        context.fillRect(x, y, 1, 1);
      }
    }
  }
};

const SampleCell = (params: { data: SampleData | null, onClick?: () => void }): JSX.Element => {
  const callback = (canvas: HTMLCanvasElement): void => {
    canvas && drawData(canvas, params.data);
  };
  return (
    <div className='image' onClick={params.onClick}>
      <canvas width={sampleWidth} height={sampleHeight} ref={callback} /><br />
      <span>{params.data ? params.data.label : '-'}</span>
    </div>
  );
};

export default SampleCell;
