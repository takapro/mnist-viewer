import React from 'react';
import ImageData, { ImageWidth, ImageHeight } from './ImageData';

const gray = Array.from({ length: 256 }, (v, i) => `rgb(${i},${i},${i})`);

const drawData = (canvas: HTMLCanvasElement, data: ImageData | null): void => {
  const context = canvas.getContext('2d');
  if (context) {
    if (data === null) {
      context.fillStyle = gray[240];
      context.fillRect(0, 0, ImageWidth, ImageHeight);
      return;
    }
    const buffer = window.atob(data.data);
    for (let y = 0; y < ImageHeight; y++) {
      for (let x = 0; x < ImageWidth; x++) {
        context.fillStyle = gray[buffer.charCodeAt(x + y * ImageWidth)];
        context.fillRect(x, y, 1, 1);
      }
    }
  }
};

const ImageView = (params: { data: ImageData | null, onClick?: () => void }): JSX.Element => {
  const callback = (canvas: HTMLCanvasElement): void => {
    canvas && drawData(canvas, params.data);
  };
  return (
    <div className='image' onClick={params.onClick}>
      <canvas width={ImageWidth} height={ImageHeight} ref={callback} /><br />
      <span>{params.data ? params.data.label : '-'}</span>
    </div>
  );
};

export default ImageView;
