'use client';

import { useEffect, useRef } from 'react';
import styles from './TechStack.module.css';

const techCards = [
  {
    title: 'Multi-Camera Capture System',
    description: 'Head-mounted egocentric cameras paired with dual wrist cameras, integrated with motion capture for ground truth validation.',
    tag: 'Capture',
  },
  {
    title: 'State-of-the-Art Pose Extraction',
    description: 'SAM 3D body estimation combined with Depth Pro monocular depth and multi-view triangulation for precise 3D trajectories.',
    tag: 'Extraction',
  },
  {
    title: 'Physics-Based Quality Validation',
    description: 'Every trajectory validated against biomechanical constraints, anatomical checks, and confidence scoring with human review.',
    tag: 'Quality',
  },
  {
    title: 'Scalable Cloud Infrastructure',
    description: 'GPU compute clusters with petabyte-scale storage, streaming delivery, and comprehensive API endpoints for data access.',
    tag: 'Infrastructure',
  },
];

export default function TechStack() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = cardsRef.current?.querySelectorAll(`.${styles.techCard}`);
            cards?.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add(styles.revealed);
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardsRef.current) {
      observer.observe(cardsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="tech-stack" className={styles.techStackSection}>
      <div className={styles.techSectionInner}>
        <h2 className={styles.techHeadline}>
          OTONOMY IS BUILDING <span className={styles.highlight}>HUMANOID DATA INFRASTRUCTURE</span> TO CAPTURE AND PROCESS <span className={styles.highlight}>MANIPULATION TRAJECTORIES AT SCALE.</span>
        </h2>

        <div className={styles.techContent}>
          <span className={styles.techSidebarLabel}>OUR STACK</span>

          <div className={styles.techCards} ref={cardsRef}>
            {techCards.map((card, index) => (
              <div key={index} className={styles.techCard}>
                <h3 className={styles.techCardTitle}>{card.title}</h3>
                <p className={styles.techCardDesc}>{card.description}</p>
                <span className={styles.techCardTag}>{card.tag}</span>
              </div>
            ))}

            <a href="#contact" className={styles.techViewMore}>VIEW TECHNICAL SPECS →</a>
          </div>
        </div>
      </div>
    </section>
  );
}
