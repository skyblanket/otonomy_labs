'use client';

import { useEffect, useRef } from 'react';
import styles from './Services.module.css';

const services = [
  {
    id: 'SVC-01',
    title: 'Data Collection',
    description: 'Factory-embedded researchers capturing real-world manipulation data across industrial environments.',
    features: [
      'Egocentric video capture',
      'Multi-view wrist cameras',
      'Motion capture ground truth',
      'Continuous deployment',
    ],
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'SVC-02',
    title: 'Data Processing',
    description: 'Automated extraction of high-fidelity hand trajectories from raw video streams.',
    features: [
      '3D pose estimation',
      'Depth-enhanced extraction',
      'Temporal smoothing',
      'Physics validation',
    ],
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'SVC-03',
    title: 'Data Delivery',
    description: 'Training-ready trajectory datasets for humanoid robot learning systems.',
    features: [
      'Standardized formats',
      'Task-labeled sequences',
      'API access',
      'Custom programs',
    ],
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = cardsRef.current?.querySelectorAll(`.${styles.serviceCard}`);
            cards?.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add(styles.visible);
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className={styles.servicesSection} ref={sectionRef}>
      <div className={styles.servicesSectionInner}>
        <div className={styles.servicesHeader}>
          <h2>WHAT WE DO</h2>
          <p>End-to-end humanoid data infrastructure from factory floor to training pipeline.</p>
        </div>

        <div className={styles.servicesGrid} ref={cardsRef}>
          {services.map((service) => (
            <div key={service.id} className={styles.serviceCard}>
              <div className={styles.serviceCardIcon}>
                {service.icon}
              </div>
              <span className={styles.serviceCardId}>{service.id}</span>
              <h3 className={styles.serviceCardTitle}>{service.title}</h3>
              <p className={styles.serviceCardDesc}>{service.description}</p>
              <ul className={styles.serviceList}>
                {service.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
