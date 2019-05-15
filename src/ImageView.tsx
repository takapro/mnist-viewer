import React from 'react';
import ImageData, { ImageWidth, ImageHeight } from './ImageData';

const gray = Array.from({ length: 256 }, (v, i) => `rgb(${i},${i},${i})`);

const drawData = (canvas: HTMLCanvasElement, data: ImageData): void => {
  const context = canvas.getContext('2d');
  if (context) {
    const buffer = window.atob(data.data);
    for (let y = 0; y < ImageHeight; y++) {
      for (let x = 0; x < ImageWidth; x++) {
        context.fillStyle = gray[buffer.charCodeAt(x + y * ImageWidth)];
        context.fillRect(x, y, 1, 1);
      }
    }
  }
};

const ImageView = (params: { data: ImageData }): JSX.Element => {
  const callback = (canvas: HTMLCanvasElement): void => {
    drawData(canvas, params.data);
  };
  return (
    <div className='image'>
      <canvas width={ImageWidth} height={ImageHeight} ref={callback} /><br />
      <span>{params.data.label}</span>
    </div>
  );
};

export default ImageView;
