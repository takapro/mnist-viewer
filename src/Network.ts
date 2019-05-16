import math from 'mathjs';

interface Network {
  W1: number[][];
  W2: number[][];
  W3: number[][];
  b1: number[];
  b2: number[];
  b3: number[];
}

const sigmoid = (x: number): number => {
  return 1.0 / (1.0 + math.exp(-x));
};

const softmax = (a: number[]): number[] => {
  const c = math.max(a);
  const exp = a.map(x => math.exp(x - c));
  const sum = math.sum(exp);
  return exp.map(x => x / sum);
};

export const predict = (network: Network, x: number[]): number[] => {
  const a1 = math.add(math.multiply(x, network.W1), network.b1) as number[];
  const z1 = a1.map(sigmoid);
  const a2 = math.add(math.multiply(z1, network.W2), network.b2) as number[];
  const z2 = a2.map(sigmoid);
  const a3 = math.add(math.multiply(z2, network.W3), network.b3) as number[];
  const z3 = softmax(a3);
  return z3;
};

export default Network;
