'use client';

import styles from './Blueprint.module.css';

const pipelineSteps = [
  {
    title: 'Video input',
    description: 'Raw egocentric and wrist camera feeds captured at high frame rates for precision.',
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Depth estimation',
    description: 'Monocular metric depth using Depth Pro for accurate 3D scene reconstruction.',
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Pose extraction',
    description: '3D body and hand mesh recovery with sub-millimeter accuracy.',
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Multi-view fusion',
    description: 'Triangulation across camera views with temporal smoothing for consistency.',
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Physics validation',
    description: 'Every trajectory validated against biomechanical constraints and filtered.',
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Data delivery',
    description: 'Petabyte-scale storage with streaming delivery and API endpoints.',
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function Blueprint() {
  return (
    <section id="tech" className={styles.blueprintSection}>
      <div className={styles.blueprintHeader}>
        <h2>RESEARCH-GRADE EXTRACTION PIPELINE</h2>
        <p>Our pipeline combines state-of-the-art pose estimation with monocular depth, multi-view triangulation, and temporal consistency.</p>
      </div>

      <div className={styles.blueprintGrid}>
        {pipelineSteps.map((step, index) => (
          <div key={index} className={styles.blueprintItem}>
            <div className={styles.blueprintIcon}>
              {step.icon}
            </div>
            <div className={styles.blueprintItemContent}>
              <h4>{step.title}</h4>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
