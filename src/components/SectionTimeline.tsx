'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './SectionTimeline.module.css';

const sections = [
  { id: 'hero', selector: '.header-section' },
  { id: 'services', selector: '#services' },
  { id: 'problem', selector: '#problem' },
  { id: 'data', selector: '#data' },
  { id: 'tech', selector: '#tech' },
  { id: 'tech-stack', selector: '#tech-stack' },
  { id: 'faq', selector: '#faq' },
  { id: 'footer', selector: 'footer' },
];

export default function SectionTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioEnabledRef = useRef(false);
  const lastActiveIndexRef = useRef(-1);

  const enableAudio = useCallback(() => {
    if (!audioEnabledRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      audioEnabledRef.current = true;
    }
  }, []);

  const playHapticClick = useCallback(() => {
    if (!audioEnabledRef.current || !audioContextRef.current) return;

    try {
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const t = ctx.currentTime;

      // Create noise buffer for click texture
      const bufferSize = ctx.sampleRate * 0.02;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      // High-pass filter for sharp attack
      const highpass = ctx.createBiquadFilter();
      highpass.type = 'highpass';
      highpass.frequency.setValueAtTime(1500, t);

      // Bandpass for mechanical character
      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(2500, t);
      bandpass.Q.setValueAtTime(2, t);

      // Sharp envelope for click
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.12, t);
      gainNode.gain.exponentialRampToValueAtTime(0.001, t + 0.015);

      noise.connect(highpass);
      highpass.connect(bandpass);
      bandpass.connect(gainNode);
      gainNode.connect(ctx.destination);

      noise.start(t);
      noise.stop(t + 0.02);
    } catch (e) {
      console.log('Audio error:', e);
    }
  }, []);

  useEffect(() => {
    // Enable audio on user interaction
    const events = ['click', 'touchstart', 'scroll'];
    events.forEach(event => {
      document.addEventListener(event, enableAudio, { passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, enableAudio);
      });
    };
  }, [enableAudio]);

  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      let newActiveIndex = 0;

      sections.forEach((section, index) => {
        const element = document.querySelector(section.selector);
        if (element) {
          const sectionTop = (element as HTMLElement).offsetTop;
          if (scrollPosition >= sectionTop) {
            newActiveIndex = index;
          }
        }
      });

      if (newActiveIndex !== lastActiveIndexRef.current) {
        if (lastActiveIndexRef.current !== -1) {
          playHapticClick();
        }
        lastActiveIndexRef.current = newActiveIndex;
        setActiveIndex(newActiveIndex);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateActiveSection();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [playHapticClick]);

  const getItemClass = (index: number) => {
    const distance = Math.abs(index - activeIndex);
    if (index === activeIndex) return styles.active;
    if (distance === 1) return styles.adjacent;
    return styles.far;
  };

  return (
    <div className={styles.sectionTimeline}>
      {sections.map((section, index) => (
        <div
          key={section.id}
          className={`${styles.timelineItem} ${getItemClass(index)}`}
          data-section={section.id}
        >
          <span className={styles.timelineLine}></span>
          <span className={styles.timelineNumber}>{String(index + 1).padStart(2, '0')}</span>
        </div>
      ))}
    </div>
  );
}
