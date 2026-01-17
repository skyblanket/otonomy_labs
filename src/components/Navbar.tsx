'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [glassStyle, setGlassStyle] = useState<React.CSSProperties>({});
  const lastScrollYRef = useRef(0);
  const navRef = useRef<HTMLElement>(null);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const headerSection = document.querySelector('.header-section');
    const headerHeight = window.innerHeight;

    if (!headerSection) return;

    const headerRect = headerSection.getBoundingClientRect();
    const headerBottom = headerRect.bottom;

    // Glass effect calculation
    if (headerBottom <= 0) {
      const scrollPast = Math.abs(headerBottom);
      const maxScroll = window.innerHeight * 0.5;
      const progress = Math.min(1, scrollPast / maxScroll);

      const blur = progress * 12;
      const opacity = 0.3 + (progress * 0.5);
      const bgAlpha = Math.min(0.85, opacity);

      setGlassStyle({
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        background: `rgba(10, 10, 10, ${bgAlpha})`,
      });
      setScrolled(true);
    } else {
      setGlassStyle({
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        background: 'linear-gradient(to bottom, var(--black) 0%, transparent 100%)',
      });
      setScrolled(false);
    }

    // Hide/show nav on scroll direction
    if (currentScrollY > headerHeight) {
      if (currentScrollY > lastScrollYRef.current) {
        // Scrolling down - hide nav
        setHidden(true);
      } else {
        // Scrolling up - show nav
        setHidden(false);
      }
    } else {
      // In header area - always show nav
      setHidden(false);
    }

    lastScrollYRef.current = currentScrollY;
  }, []);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  return (
    <nav
      ref={navRef}
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${hidden ? styles.navHidden : ''}`}
      style={glassStyle}
    >
      <div className={styles.logo}>
        <Image src="/otonew.svg" alt="OTONOMY" width={120} height={64} />
      </div>
      <div className={styles.navRight}>
        <ul className={styles.navLinks}>
          <li><a href="#services">Services</a></li>
          <li><a href="#data">Data</a></li>
          <li><a href="#tech">Technology</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#login" className={styles.navLogin}>LOG IN</a>
      </div>
    </nav>
  );
}
