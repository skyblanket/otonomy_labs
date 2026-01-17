'use client';

import { useEffect, useRef, useCallback } from 'react';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
const getRandomChar = () => chars[Math.floor(Math.random() * chars.length)];

export function useEncryptEffect() {
  const isAnimatingRef = useRef<Map<HTMLElement, boolean>>(new Map());

  const encryptText = useCallback((element: HTMLElement, originalText: string, duration = 800) => {
    const iterations = 20;
    let iteration = 0;
    const interval = duration / iterations;

    const animate = () => {
      if (iteration >= iterations) {
        element.textContent = originalText;
        return;
      }

      const progress = iteration / iterations;
      const revealedLength = Math.floor(originalText.length * progress);

      let newText = '';
      for (let i = 0; i < originalText.length; i++) {
        if (i < revealedLength) {
          newText += originalText[i];
        } else if (originalText[i] === ' ') {
          newText += ' ';
        } else {
          newText += getRandomChar();
        }
      }

      element.textContent = newText;
      iteration++;
      setTimeout(animate, interval);
    };

    animate();
  }, []);

  useEffect(() => {
    const buttons = document.querySelectorAll('.btn-primary');

    const handleMouseEnter = (e: Event) => {
      const button = e.target as HTMLElement;
      const originalText = button.getAttribute('data-original-text') || button.textContent || '';

      if (!button.getAttribute('data-original-text')) {
        button.setAttribute('data-original-text', originalText);
      }

      if (!isAnimatingRef.current.get(button)) {
        isAnimatingRef.current.set(button, true);
        encryptText(button, originalText, 800);
        setTimeout(() => {
          isAnimatingRef.current.set(button, false);
        }, 800);
      }
    };

    buttons.forEach(button => {
      button.addEventListener('mouseenter', handleMouseEnter);
    });

    return () => {
      buttons.forEach(button => {
        button.removeEventListener('mouseenter', handleMouseEnter);
      });
    };
  }, [encryptText]);
}
