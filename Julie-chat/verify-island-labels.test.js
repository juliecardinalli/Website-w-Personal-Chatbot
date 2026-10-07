import assert from 'node:assert/strict';
import test from 'node:test';
import { arrangeIslandLabels } from './src/island-label-layout.js';

for (const width of [320, 390, 768, 1280]) {
  test(`five island labels fit without overlap at ${width}px`, () => {
    const height = 495;
    const input = [
      { id:'work', x:width*.17, y:225, width:105, height:40 },
      { id:'ai', x:width*.53, y:242, width:128, height:40 },
      { id:'reading', x:width*.29, y:272, width:117, height:40 },
      { id:'life', x:5, y:306, width:133, height:40 },
      { id:'speaking', x:width*.39, y:329, width:131, height:40 },
    ];
    const original = structuredClone(input);
    const placed = arrangeIslandLabels(input, width, height);
    assert.equal(placed.length,5);
    assert.deepEqual(input,original);
    for (const [index, a] of placed.entries()) {
      assert.ok(a.x >= 8 && a.x+a.width <= width-8);
      assert.ok(a.y >= 28 && a.y+a.height <= height-58);
      for (const b of placed.slice(index+1)) {
        assert.ok(a.x+a.width+6<=b.x || b.x+b.width+6<=a.x || a.y+a.height+6<=b.y || b.y+b.height+6<=a.y, `${a.id} overlaps ${b.id}`);
      }
    }
  });
}
test('already separated labels keep their projected positions', () => {
  const labels = [{id:'a',x:20,y:40,width:100,height:40},{id:'b',x:200,y:140,width:100,height:40}];
  assert.deepEqual(arrangeIslandLabels(labels,500,500),labels);
});
