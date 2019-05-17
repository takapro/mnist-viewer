import React, { useRef, useEffect } from 'react';
import { sampleWidth, sampleHeight } from './SampleData';

interface DrawState {
  pen: number;
  down?: boolean;
  prevX?: number;
  prevY?: number;
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
    context.fillStyle = 'black';
    context.lineWidth = state.pen;
    context.lineCap = 'round';
    context.beginPath();
    context.moveTo(state.prevX || x, state.prevY || y);
    context.lineTo(x, y);
    context.stroke();
    state.prevX = x;
    state.prevY = y;
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
  canvas.addEventListener('mouseup', () => {
    state.down = false;
  });
  canvas.addEventListener('mouseleave', () => {
    state.down = false;
  });
};

const Draw = (): JSX.Element => {
  const canvasRef = useRef(null as HTMLCanvasElement | null);
  const stateRef = useRef({ pen: 10 } as DrawState);
  useEffect(() => {
    canvasRef.current && setupEvents(canvasRef.current, stateRef.current);
  }, [canvasRef]);
  return (
    <div className='draw'>
      <canvas width={sampleWidth * 10} height={sampleHeight * 10} ref={canvasRef} />
    </div>
  );
};

export default Draw;
