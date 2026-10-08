import assert from 'node:assert/strict';
import test from 'node:test';
import { attachAvatarCursor, avatarOffset } from './src/avatar-cursor.js';

function fixture() {
  const target = () => {
    const handlers = new Map();
    return {
      addEventListener(type, fn) { if (!handlers.has(type)) handlers.set(type, new Set()); handlers.get(type).add(fn); },
      removeEventListener(type, fn) { handlers.get(type)?.delete(fn); },
      emit(type, event = {}) { handlers.get(type)?.forEach((fn) => fn(event)); },
      count() { return [...handlers.values()].reduce((n, entries) => n + entries.size, 0); },
    };
  };
  const classes = new Set(), frames = new Map(), timers = new Map();
  const media = Object.assign(target(), { matches: true });
  let next = 0;
  const win = Object.assign(target(), {
    innerWidth: 800, innerHeight: 600, matchMedia: () => media,
    requestAnimationFrame(fn) { frames.set(++next, fn); return next; },
    cancelAnimationFrame(id) { frames.delete(id); },
    setTimeout(fn) { timers.set(++next, fn); return next; },
    clearTimeout(id) { timers.delete(id); },
  });
  const doc = Object.assign(target(), { hidden: false, documentElement: {
    clientWidth: 800, clientHeight: 600,
    classList: { add: (name) => classes.add(name), remove: (name) => classes.delete(name) },
  } });
  const node = {
    dataset: {}, open: false, shows: 0,
    style: { setProperty(name, value) { this[name] = value; } },
    matches() { return this.open; },
    showPopover() { this.open = true; this.shows++; },
    hidePopover() { this.open = false; },
  };
  const flush = (queue) => { const pending = [...queue.values()]; queue.clear(); pending.forEach((fn) => fn()); };
  const mouse = (overrides = {}) => ({ pointerType: 'mouse', clientX: 100, clientY: 100, target: { closest: () => null }, ...overrides });
  return { win, doc, media, node, classes, frames, timers, mouse, frame: () => flush(frames), idle: () => flush(timers) };
}

test('avatar flips inward near the viewport edges', () => {
  assert.deepEqual(avatarOffset(100, 100, 800, 600), { x: 10, y: 8 });
  assert.deepEqual(avatarOffset(799, 599, 800, 600), { x: -54, y: -70 });
});

test('pointer updates coalesce, click point is exact, and walking stops while idle', () => {
  const f = fixture(), cursor = attachAvatarCursor(f.node, f.win, f.doc);
  f.doc.emit('pointermove', f.mouse());
  f.doc.emit('pointermove', f.mouse({ clientX: 110 }));
  assert.equal(f.frames.size, 1);
  f.frame();
  assert.equal(f.node.style.transform, 'translate3d(110px, 100px, 0)');
  assert.equal(f.node.open, true);
  assert.ok(f.classes.has('avatar-cursor-active'));
  f.doc.emit('pointermove', f.mouse({ clientX: 130 }));
  f.frame();
  assert.equal(f.node.dataset.walking, 'true');
  f.idle();
  assert.equal(f.node.dataset.walking, 'false');
  assert.equal(f.frames.size, 0);
  cursor.destroy();
});

test('touch, reduced motion, and non-hover devices never replace the native cursor', () => {
  for (const setup of ['touch', 'media']) {
    const f = fixture(), cursor = attachAvatarCursor(f.node, f.win, f.doc);
    if (setup === 'media') f.media.matches = false;
    f.doc.emit('pointermove', f.mouse(setup === 'touch' ? { pointerType: 'touch' } : {}));
    f.frame();
    assert.equal(f.node.open, false);
    assert.equal(f.classes.size, 0);
    cursor.destroy();
  }
});

test('text fields and embedded media use the native cursor', () => {
  const f = fixture(), cursor = attachAvatarCursor(f.node, f.win, f.doc);
  f.doc.emit('pointermove', f.mouse()); f.frame();
  let selector;
  f.doc.emit('pointerover', f.mouse({ target: { closest(value) { selector = value; return {}; } } }));
  assert.equal(f.node.open, false);
  assert.equal(f.classes.size, 0);
  for (const part of ['input', 'textarea', 'contenteditable', 'iframe', 'video']) assert.ok(selector.includes(part));
  cursor.destroy();
});

test('keyboard, blur, leave, cancellation, scrolling and media changes restore the cursor', () => {
  for (const event of ['keydown', 'blur', 'pointerout', 'pointercancel', 'scroll', 'change']) {
    const f = fixture(), cursor = attachAvatarCursor(f.node, f.win, f.doc);
    f.doc.emit('pointermove', f.mouse()); f.frame();
    const source = event === 'change' ? f.media : ['blur', 'scroll'].includes(event) ? f.win : f.doc;
    source.emit(event, { relatedTarget: null });
    assert.equal(f.node.open, false, event);
    assert.equal(f.classes.size, 0, event);
    cursor.destroy();
  }
});

test('modal restacking keeps decoration visible and cleanup removes every listener', () => {
  const f = fixture(), cursor = attachAvatarCursor(f.node, f.win, f.doc);
  f.doc.emit('pointermove', f.mouse()); f.frame();
  cursor.restack();
  assert.equal(f.node.shows, 2);
  assert.equal(f.node.open, true);
  f.doc.emit('pointerdown', f.mouse());
  assert.equal(f.node.dataset.pressed, 'true');
  f.doc.emit('pointerup', f.mouse());
  assert.equal(f.node.dataset.pressed, 'false');
  cursor.destroy();
  assert.equal(f.node.open, false);
  assert.equal(f.classes.size + f.frames.size + f.timers.size, 0);
  assert.equal(f.doc.count() + f.win.count() + f.media.count(), 0);
});

test('unsupported or failed popovers do not hide the system pointer', () => {
  for (const setup of ['unsupported', 'failure']) {
    const f = fixture();
    f.node.showPopover = setup === 'unsupported' ? undefined : () => { throw new Error('Unavailable'); };
    const cursor = attachAvatarCursor(f.node, f.win, f.doc);
    f.doc.emit('pointermove', f.mouse()); f.frame();
    assert.equal(f.classes.size, 0);
    assert.equal(f.frames.size, 0);
    cursor.destroy();
  }
});

test('leaving before a scheduled frame prevents a ghost cursor', () => {
  const f = fixture(), cursor = attachAvatarCursor(f.node, f.win, f.doc);
  f.doc.emit('pointermove', f.mouse());
  f.doc.emit('pointerout', { relatedTarget: null });
  f.frame();
  assert.equal(f.node.open, false);
  assert.equal(f.classes.size, 0);
  cursor.destroy();
});
