'use client';

import { useEffect, useState, useRef } from 'react';
import { useSoundContext } from './SoundContext';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const { soundEnabled, toggleSound } = useSoundContext();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const requestRef = useRef<number>(0);
  const mouseRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    const animate = () => {
      setPosition(prev => ({
        x: prev.x + (mouseRef.current.x - prev.x) * 0.2,
        y: prev.y + (mouseRef.current.y - prev.y) * 0.2,
      }));
      requestRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(requestRef.current);
    };
  }, [visible, isMobile]);

  // Enable sound on first click (desktop)
  useEffect(() => {
    if (isMobile || soundEnabled) return;

    const handleClick = () => {
      toggleSound();
    };

    document.addEventListener('click', handleClick, { once: true });
    return () => document.removeEventListener('click', handleClick);
  }, [isMobile, soundEnabled, toggleSound]);

  const handleToggle = () => {
    toggleSound();
  };

  return (
    <>
      {/* Cursor tooltip for desktop - disappears after sound enabled */}
      {!isMobile && visible && !soundEnabled && (
        <div
          className={styles.cursorLabel}
          style={{
            left: position.x,
            top: position.y,
          }}
        >
          CLICK TO ENABLE SOUND
        </div>
      )}

      {/* Mobile only: sound toggle button - disappears after enabled */}
      {isMobile && !soundEnabled && (
        <button
          className={styles.soundToggle}
          onClick={handleToggle}
          aria-label="Enable sound"
        >
          <span className={styles.soundIcon}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 5L6 9H2v6h4l5 4V5z"/>
              <line x1="23" y1="9" x2="17" y2="15"/>
              <line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
          </span>
          <span className={styles.soundLabel}>OFF</span>
        </button>
      )}
    </>
  );
}
