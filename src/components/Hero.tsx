'use client';

import dynamic from 'next/dynamic';
import styles from './Hero.module.css';

const SplineViewer = dynamic(() => import('./SplineViewer'), {
  ssr: false,
  loading: () => <div className={styles.splineLoading} />,
});

export default function Hero() {
  return (
    <section className={`${styles.headerSection} header-section`}>
      <SplineViewer url="https://prod.spline.design/DL5i8BLwRdY5cjX6/scene.splinecode" />

      <div className={styles.heroContentBox}>
        <div className={styles.heroBadge}>
          <span>LIVE DATA COLLECTION</span>
        </div>
        <h1 className={styles.heroTitle}>
          <span className={styles.highlight}>HUMANOID</span><br />
          DATA<br />
          INFRASTRUCTURE
        </h1>
        <p className={styles.heroSubtitle}>
          Factory-embedded data collection for the robotics era.
          We capture, process, and deliver manipulation trajectories at scale.
        </p>
        <div className={styles.heroCta}>
          <a href="#contact" className="btn btn-primary">GET DATA</a>
          <a href="#services" className="btn btn-secondary">
            LEARN MORE <span className="arrow">→</span>
          </a>
        </div>
      </div>

      <div className={styles.statsBar}>
        <div className={styles.stat}>
          <span className={styles.statValue}>100K+</span>
          <span className={styles.statLabel}>Hours Captured</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>10M+</span>
          <span className={styles.statLabel}>Trajectories</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>&lt;3mm</span>
          <span className={styles.statLabel}>Pose Accuracy</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>24/7</span>
          <span className={styles.statLabel}>Pipeline Active</span>
        </div>
      </div>
    </section>
  );
}
