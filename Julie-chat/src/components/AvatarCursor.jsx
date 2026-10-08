import { useEffect, useRef, useState } from 'react';
import { attachAvatarCursor } from '../avatar-cursor';
import head from '../assets/julie-cursor-head.png';
import './avatar-cursor.css';

export default function AvatarCursor({ layerKey }) {
  const node = useRef(null);
  const controller = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready) return;
    const cursor = attachAvatarCursor(node.current);
    controller.current = cursor;
    return () => { cursor.destroy(); controller.current = null; };
  }, [ready]);

  // Native modal chapters occupy the top layer; keep the decoration above them.
  useEffect(() => { controller.current?.restack(); }, [layerKey]);

  return <div ref={node} className="avatar-cursor" popover="manual" aria-hidden="true" data-walking="false" data-pressed="false">
    <span className="avatar-cursor-dot" />
    <div className="avatar-cursor-figure">
      <div className="avatar-cursor-doodle">
        <svg className="avatar-cursor-body" viewBox="0 0 46 34" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" focusable="false">
          <path d="M23 3 L23 19" />
          <path className="avatar-arm avatar-arm-left" d="M23 9 L16 15 L12 12" />
          <path className="avatar-arm avatar-arm-right" d="M23 9 L30 14 L34 9" />
          <path className="avatar-leg avatar-leg-left" d="M23 19 L18 28 L14 30" />
          <path className="avatar-leg avatar-leg-right" d="M23 19 L28 28 L32 30" />
        </svg>
        <img src={head} alt="" className="avatar-cursor-head" draggable="false" onLoad={() => setReady(true)} onError={() => setReady(false)} />
      </div>
    </div>
  </div>;
}
