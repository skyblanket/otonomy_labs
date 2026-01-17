'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import styles from './not-found.module.css';
import Link from 'next/link';

interface Position {
  x: number;
  y: number;
}

export default function NotFound() {
  const [videoPos, setVideoPos] = useState<Position>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState<boolean>(false);
  const [loaded, setLoaded] = useState(false);
  const dragStart = useRef<Position>({ x: 0, y: 0 });
  const startPos = useRef<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    startPos.current = videoPos;
  }, [videoPos]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setVideoPos({ x: startPos.current.x + dx, y: startPos.current.y + dy });
  }, [dragging]);

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  return (
    <div
      className={styles.container}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className={styles.windowStack}>
        <div
          className={`${styles.videoWindow} ${loaded ? styles.loaded : ''}`}
          style={{
            '--drag-x': `${videoPos.x}px`,
            '--drag-y': `${videoPos.y}px`
          } as React.CSSProperties}
        >
          <div
            className={styles.windowHeader}
            onMouseDown={handleMouseDown}
          >
            <span className={styles.windowTitle}>ERROR_404.mp4</span>
            <div className={styles.windowControls}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <video
            src="/hero-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={styles.video}
          />
        </div>
      </div>

      <div className={`${styles.info} ${loaded ? styles.loaded : ''}`}>
        <h1 className={styles.errorCode}>404</h1>
        <p className={styles.message}>PAGE NOT FOUND</p>
        <Link href="/" className={styles.homeLink}>
          RETURN HOME <span className={styles.arrow}>→</span>
        </Link>
      </div>
    </div>
  );
}
