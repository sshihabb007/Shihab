'use client';

import React, { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  useEffect(() => {
    const cursorDot = dotRef.current;
    const cursorOutline = outlineRef.current;

    if (!cursorDot || !cursorOutline) return;

    const handleMouseMove = (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      // Move the dot instantly
      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      // Move the outline
      cursorOutline.style.left = `${posX}px`;
      cursorOutline.style.top = `${posY}px`;

      // Add scaling effect when hovering over interactive elements
      const targets = e.target.closest('a, button, .pill, .project-row, .data-row');
      if (targets) {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.backgroundColor = 'rgba(128, 128, 128, 0.2)';
        cursorDot.style.opacity = '0';
      } else {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.backgroundColor = 'transparent';
        cursorDot.style.opacity = '1';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot"></div>
      <div ref={outlineRef} className="cursor-outline"></div>
    </>
  );
}
