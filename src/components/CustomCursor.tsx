'use client';

import { useEffect, useState, useRef } from 'react';
import { useSoundContext } from './SoundContext';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const { soundEnabled, toggleSound, playClick } = useSoundContext();
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

  const handleToggle = () => {
    toggleSound();
    playClick();
  };

  return (
    <>
      {/* Cursor label for desktop */}
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

      {/* Fixed sound toggle button */}
      <button
        className={`${styles.soundToggle} ${soundEnabled ? styles.enabled : ''}`}
        onClick={handleToggle}
        aria-label={soundEnabled ? 'Disable sound' : 'Enable sound'}
      >
        <span className={styles.soundIcon}>
          {soundEnabled ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 5L6 9H2v6h4l5 4V5z"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 5L6 9H2v6h4l5 4V5z"/>
              <line x1="23" y1="9" x2="17" y2="15"/>
              <line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
          )}
        </span>
        <span className={styles.soundLabel}>
          {soundEnabled ? 'ON' : 'OFF'}
        </span>
      </button>
    </>
  );
}
