import test from 'tape';
import * as math from 'mathjs';

test('matrix', t => {
  const m = math.matrix([[1, 2, 3], [4, 5, 6]]);
  const v = math.matrix([[7], [8], [9]]);
  const mv = math.multiply(m, v);
  t.equal(mv.toString(), '[[50], [122]]');
  t.end();
});
