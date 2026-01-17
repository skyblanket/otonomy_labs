'use client';

import { useEffect, useRef } from 'react';
import styles from './SplineViewer.module.css';

interface Props {
  url: string;
}

export default function SplineViewer({ url }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load the Spline viewer script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.48/build/spline-viewer.js';
    document.head.appendChild(script);

    // Create the spline-viewer element
    script.onload = () => {
      if (containerRef.current && !containerRef.current.querySelector('spline-viewer')) {
        const viewer = document.createElement('spline-viewer');
        viewer.setAttribute('url', url);
        viewer.setAttribute('events-target', 'none');
        viewer.setAttribute('loading-anim-type', 'none');
        viewer.setAttribute('hint', 'false');
        viewer.setAttribute('mouse-target', 'none');
        containerRef.current.appendChild(viewer);
      }
    };

    // Hide Spline watermark elements
    const hideSplineElements = () => {
      const viewer = containerRef.current?.querySelector('spline-viewer');
      if (!viewer?.shadowRoot) return;

      const shadowRoot = viewer.shadowRoot;
      const elementsToHide = [
        ...shadowRoot.querySelectorAll('#logo'),
        ...shadowRoot.querySelectorAll('[id*="logo"]'),
        ...shadowRoot.querySelectorAll('[id*="hint"]'),
        ...shadowRoot.querySelectorAll('a[href*="spline"]'),
        ...shadowRoot.querySelectorAll('img[alt*="hint"]'),
        ...shadowRoot.querySelectorAll('img[src*="hint"]'),
      ];

      elementsToHide.forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.display = 'none';
          el.style.opacity = '0';
          el.style.visibility = 'hidden';
          el.style.pointerEvents = 'none';
        }
      });
    };

    // Run multiple times to catch async-loaded elements
    const timers = [100, 500, 1000, 2000, 3000, 5000].map(
      (delay) => setTimeout(hideSplineElements, delay)
    );

    // Observe for changes
    const observer = new MutationObserver(hideSplineElements);
    const checkObserver = setInterval(() => {
      const viewer = containerRef.current?.querySelector('spline-viewer');
      if (viewer?.shadowRoot) {
        observer.observe(viewer.shadowRoot, { childList: true, subtree: true });
        clearInterval(checkObserver);
      }
    }, 100);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(checkObserver);
      observer.disconnect();
    };
  }, [url]);

  return <div ref={containerRef} className={styles.container} />;
}
