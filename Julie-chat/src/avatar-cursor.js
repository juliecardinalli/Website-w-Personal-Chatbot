export const AVATAR_MEDIA = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';
const NATIVE_TARGETS = 'input, textarea, select, [contenteditable]:not([contenteditable="false"]), iframe, video, [data-native-cursor]';

export function avatarOffset(x, y, width, height) {
  return { x: x + 58 > width ? -54 : 10, y: y + 74 > height ? -70 : 8 };
}

// One frame per pointer update; no animation loop or React renders while idle.
export function attachAvatarCursor(node, win = window, doc = document) {
  if (typeof node.showPopover !== 'function') return { destroy() {}, restack() {} };
  const media = win.matchMedia(AVATAR_MEDIA);
  let frame = 0, stopWalking = 0, visible = false, point = null, last = null;
  const listeners = [];
  const listen = (target, type, handler) => {
    target.addEventListener(type, handler, { passive: true, capture: true });
    listeners.push(() => target.removeEventListener(type, handler, true));
  };
  const hide = () => {
    win.cancelAnimationFrame(frame);
    win.clearTimeout(stopWalking);
    frame = 0;
    visible = false;
    last = null;
    node.dataset.walking = 'false';
    node.dataset.pressed = 'false';
    doc.documentElement.classList.remove('avatar-cursor-active');
    if (node.matches(':popover-open')) node.hidePopover();
  };
  const restack = () => {
    if (!visible) return;
    try {
      if (node.matches(':popover-open')) node.hidePopover();
      node.showPopover();
    } catch { hide(); }
  };
  const paint = () => {
    frame = 0;
    const { x, y } = point;
    const offset = avatarOffset(x, y, win.innerWidth, win.innerHeight);
    node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    node.style.setProperty('--avatar-x', `${offset.x}px`);
    node.style.setProperty('--avatar-y', `${offset.y}px`);
    if (last && Math.hypot(x - last.x, y - last.y) > 2) {
      node.dataset.walking = 'true';
      win.clearTimeout(stopWalking);
      stopWalking = win.setTimeout(() => { node.dataset.walking = 'false'; }, 140);
    }
    last = point;
    try {
      if (!node.matches(':popover-open')) node.showPopover();
      visible = true;
      doc.documentElement.classList.add('avatar-cursor-active');
    } catch { hide(); }
  };
  const move = (event) => {
    if (!media.matches || event.pointerType !== 'mouse' || doc.hidden ||
        event.target?.closest?.(NATIVE_TARGETS) ||
        event.clientX >= doc.documentElement.clientWidth || event.clientY >= doc.documentElement.clientHeight) {
      hide();
      return;
    }
    point = { x: event.clientX, y: event.clientY };
    if (!frame) frame = win.requestAnimationFrame(paint);
  };
  listen(doc, 'pointermove', move);
  listen(doc, 'pointerover', move);
  listen(doc, 'pointerdown', (event) => {
    move(event);
    node.dataset.pressed = event.pointerType === 'mouse' ? 'true' : 'false';
  });
  listen(doc, 'pointerup', () => { node.dataset.pressed = 'false'; });
  listen(doc, 'pointercancel', hide);
  listen(doc, 'pointerout', (event) => { if (!event.relatedTarget) hide(); });
  listen(doc, 'keydown', hide);
  listen(doc, 'focusin', (event) => { if (event.target?.closest?.(NATIVE_TARGETS)) hide(); });
  listen(doc, 'visibilitychange', hide);
  listen(win, 'blur', hide);
  listen(win, 'resize', hide);
  listen(win, 'scroll', hide);
  listen(media, 'change', hide);
  return { restack, destroy() { hide(); listeners.forEach((remove) => remove()); } };
}
