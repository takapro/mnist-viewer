export const sampleWidth = 28;
export const sampleHeight = 28;

interface SampleData {
  id: string;
  image: string;
  label?: number;
  result?: number;
}

export const normalizedImage = (data: SampleData): number[] => {
  const buffer = window.atob(data.image);
  return Array.from({ length: buffer.length }, (v, i) => buffer.charCodeAt(i) / 255.0);
};

export const forEachPixel = (data: SampleData, proc: (x: number, y: number, pixel: number) => void): void => {
  const buffer = window.atob(data.image);
  for (let y = 0; y < sampleWidth; y++) {
    for (let x = 0; x < sampleHeight; x++) {
      proc(x, y, buffer.charCodeAt(x + y * sampleWidth));
    }
  }
};

export const collectPixels = (getPixel: (x: number, y: number) => number): string => {
  let buffer = '';
  for (let y = 0; y < sampleHeight; y++) {
    for (let x = 0; x < sampleWidth; x++) {
      buffer += String.fromCharCode(getPixel(x, y));
    }
  }
  return window.btoa(buffer);
};

export default SampleData;
