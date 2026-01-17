'use client';

import { useEffect, useRef } from 'react';
import styles from './AsciiVideo.module.css';

interface Props {
  src: string;
  width?: number;
  height?: number;
  showVideo?: boolean;
  syncTime?: () => number;
}

export default function AsciiVideo({ src, width = 120, height = 80, showVideo = true, syncTime }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const outputRef = useRef<HTMLPreElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const output = outputRef.current;
    if (!video || !canvas || !output) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    // ASCII chars from dark to light
    const chars = ' .:-=+*#%@';

    // Bright colors based on brightness
    const getColor = (b: number): string => {
      if (b < 15) return 'transparent';
      if (b < 40) return '#FF0000';
      if (b < 70) return '#FF3300';
      if (b < 100) return '#FF6B00';
      if (b < 130) return '#FFAA00';
      if (b < 160) return '#00FF88';
      if (b < 190) return '#00FFFF';
      if (b < 220) return '#FFFFFF';
      return '#FFFFFF';
    };

    let lastTime = 0;
    const frameInterval = 100; // ~10fps for performance

    const renderFrame = (time: number) => {
      if (time - lastTime < frameInterval) {
        animationRef.current = requestAnimationFrame(renderFrame);
        return;
      }
      lastTime = time;

      if (video.paused || video.ended) {
        video.play().catch(() => {});
      }

      // Sync with main video if syncTime provided
      if (syncTime) {
        const targetTime = syncTime();
        if (Math.abs(video.currentTime - targetTime) > 0.2) {
          video.currentTime = targetTime;
        }
      }

      ctx.drawImage(video, 0, 0, width, height);
      const { data } = ctx.getImageData(0, 0, width, height);

      let html = '';
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;
          const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
          const charIdx = Math.floor((brightness / 255) * (chars.length - 1));
          const color = getColor(brightness);
          html += `<span style="color:${color}">${chars[charIdx]}</span>`;
        }
        html += '\n';
      }
      output.innerHTML = html;

      animationRef.current = requestAnimationFrame(renderFrame);
    };

    const start = () => {
      video.play().catch(() => {});
      requestAnimationFrame(renderFrame);
    };

    video.addEventListener('canplay', start);
    if (video.readyState >= 3) start();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      video.removeEventListener('canplay', start);
    };
  }, [width, height]);

  return (
    <div className={styles.container}>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className={showVideo ? styles.realVideo : styles.hiddenVideo}
      />
      <canvas ref={canvasRef} className={styles.hiddenCanvas} />
      <pre ref={outputRef} className={styles.asciiOutput} />
    </div>
  );
}
