import React, { useState, useRef, useEffect } from 'react';
import SampleData, { sampleWidth, sampleHeight } from './SampleData';

interface DrawState {
  pen: number;
  down?: boolean;
  prevX?: number;
  prevY?: number;
  setData?: (data: SampleData | null) => void;
}

const clear = (canvas: HTMLCanvasElement): void => {
  const context = canvas.getContext('2d');
  if (context) {
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
};

const draw = (canvas: HTMLCanvasElement, state: DrawState, event: MouseEvent): void => {
  const context = canvas.getContext('2d');
  if (context) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    context.strokeStyle = state.pen ? 'black' : 'white';
    context.lineWidth = state.pen || 50;
    context.lineCap = 'round';
    context.beginPath();
    context.moveTo(state.prevX || x, state.prevY || y);
    context.lineTo(x, y);
    context.stroke();
    state.prevX = x;
    state.prevY = y;
  }
};

const updateData = (canvas: HTMLCanvasElement, setData: (data: SampleData | null) => void): void => {
  const context = canvas.getContext('2d');
  if (context) {
    let buffer = '';
    for (let y = 0; y < sampleHeight; y++) {
      for (let x = 0; x < sampleWidth; x++) {
        const imageData = context.getImageData(x * 10, y * 10, 10, 10);
        let color = 0;
        for (let i = 0; i < 10; i++) {
          for (let j = 0; j < 10; j++) {
            color += 255 - imageData.data[i * 40 + j * 4];
          }
        }
        buffer += String.fromCharCode(color / 100);
      }
    }
    setData({ data: window.btoa(buffer) });
  }
};

const setupEvents = (canvas: HTMLCanvasElement, state: DrawState): void => {
  clear(canvas);
  canvas.addEventListener('mousedown', event => {
    state.down = true;
    state.prevX = undefined;
    state.prevY = undefined;
    draw(canvas, state, event);
  });
  canvas.addEventListener('mousemove', event => {
    if (state.down) {
      draw(canvas, state, event);
    }
  });
  const mouseUp = (): void => {
    state.down && state.setData && updateData(canvas, state.setData);
    state.down = false;
  };
  canvas.addEventListener('mouseup', mouseUp);
  canvas.addEventListener('mouseleave', mouseUp);
};

const Draw = (props: { setData: (data: SampleData | null) => void }): JSX.Element => {
  const [pen, setPen] = useState(20);
  const canvasRef = useRef(null as HTMLCanvasElement | null);
  const stateRef = useRef({ pen } as DrawState);
  useEffect(() => {
    canvasRef.current && setupEvents(canvasRef.current, stateRef.current);
  }, [canvasRef]);
  stateRef.current.pen = pen;
  stateRef.current.setData = props.setData;
  return (
    <div className='draw'>
      <canvas width={sampleWidth * 10} height={sampleHeight * 10} ref={canvasRef} /><br />
      <label><input type='radio' name='pen' value='1' onClick={() => setPen(10)} />Thin</label>
      <label><input type='radio' name='pen' value='2' onClick={() => setPen(20)} defaultChecked />Medium</label>
      <label><input type='radio' name='pen' value='3' onClick={() => setPen(30)} />Thick</label>
      <label><input type='radio' name='pen' value='0' onClick={() => setPen(0)} />Erase</label>
      <button onClick={() => {
        canvasRef.current && clear(canvasRef.current);
        props.setData(null);
      }}>Clear</button>
    </div>
  );
};

export default Draw;
