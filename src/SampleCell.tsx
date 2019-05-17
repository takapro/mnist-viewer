import React, { useRef, useEffect } from 'react';
import SampleData, { sampleWidth, sampleHeight, forEachPixel } from './SampleData';

const gray = Array.from({ length: 256 }, (v, i) => `rgb(${i},${i},${i})`);

const drawData = (canvas: HTMLCanvasElement, data: SampleData | null): void => {
  const context = canvas.getContext('2d');
  if (context) {
    if (data === null) {
      context.fillStyle = gray[240];
      context.fillRect(0, 0, canvas.width, canvas.height);
      return;
    }
    forEachPixel(data, (x, y, pixel) => {
      context.fillStyle = gray[pixel];
      context.fillRect(x, y, 1, 1);
    });
  }
};

const SampleCell = (params: { data: SampleData | null, onClick?: () => void }): JSX.Element => {
  const canvasRef = useRef(null as HTMLCanvasElement | null);
  useEffect(() => {
    canvasRef.current && drawData(canvasRef.current, params.data);
  }, [canvasRef, params.data]);
  return (
    <div className='image' onClick={params.onClick}>
      <canvas width={sampleWidth} height={sampleHeight} ref={canvasRef} /><br />
      <span>{params.data && params.data.label !== undefined ? params.data.label : '-'}</span>
    </div>
  );
};

export default SampleCell;
