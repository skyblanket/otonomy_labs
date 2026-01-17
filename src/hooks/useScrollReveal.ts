'use client';

import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Select all sections except hero
    const sections = document.querySelectorAll('section:not(.header-section)');
    sections.forEach(section => {
      const el = section as HTMLElement;
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
      observer.observe(section);
    });

    // Also observe the footer
    const footer = document.querySelector('footer');
    if (footer) {
      const el = footer as HTMLElement;
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
      observer.observe(footer);
    }

    // Hero section should be visible immediately
    const heroSection = document.querySelector('.header-section');
    if (heroSection) {
      (heroSection as HTMLElement).style.opacity = '1';
      (heroSection as HTMLElement).style.transform = 'translateY(0)';
    }

    return () => observer.disconnect();
  }, []);
}
