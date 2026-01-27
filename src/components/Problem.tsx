'use client';

import styles from './Problem.module.css';

const approaches = [
  {
    title: 'Teleoperation',
    description: "Expensive hardware. Slow collection. Limited to lab environments. Doesn't scale to real-world complexity.",
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Simulation',
    description: "Sim-to-real gap. Limited task diversity. Unrealistic physics. Synthetic artifacts that don't transfer.",
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Internet Video',
    description: 'No depth data. No 3D poses. Noisy labels. Inconsistent viewpoints. No ground truth validation.',
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Our Solution',
    description: 'Dedicated data infrastructure — real humans, real tasks, real factories. Physics-validated trajectories at scale.',
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function Problem() {
  return (
    <section id="problem" className={styles.problemSection}>
      <div className={styles.problemHeader}>
        <h2>THE PROBLEM</h2>
        <p>Humanoid robots need to learn manipulation from human demonstrations. Current approaches don&apos;t scale.</p>
      </div>

      <div className={styles.problemGrid}>
        <div className={styles.problemVisual}>
          <video
            className={styles.problemVideo}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/hands-demo.mp4" type="video/mp4" />
          </video>
          <div className={styles.problemStatusBadge}>
            <span>Real factory data • 10-15mm accuracy</span>
          </div>
        </div>

        <div className={styles.problemApproaches}>
          {approaches.map((approach, index) => (
            <div key={index} className={styles.approach}>
              <div className={styles.approachIcon}>
                {approach.icon}
              </div>
              <div className={styles.approachContent}>
                <div className={styles.approachTitle}>{approach.title}</div>
                <p className={styles.approachDesc}>{approach.description}</p>
              </div>
            </div>
          ))}

          <div className={styles.problemCta}>
            <a href="#data" className="btn">SEE OUR DATA PRODUCTS</a>
          </div>
        </div>
      </div>
    </section>
  );
}
