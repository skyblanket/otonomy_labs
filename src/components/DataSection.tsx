'use client';

import styles from './DataSection.module.css';

const dataProducts = [
  {
    id: 'VID-01',
    title: 'Raw Video Streams',
    description: 'Egocentric factory footage. Multi-view optional. Bulk licensing available.',
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="6" cy="6" r="3"/>
        <circle cx="18" cy="6" r="3"/>
        <circle cx="6" cy="18" r="3"/>
        <circle cx="18" cy="18" r="3"/>
        <rect x="10" y="10" width="4" height="4" rx="1"/>
      </svg>
    ),
  },
  {
    id: 'TRJ-02',
    title: 'Extracted Trajectories',
    description: '3D hand joint sequences. Quality-filtered and physics-validated.',
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 17L9 11L13 15L21 7"/>
        <circle cx="3" cy="17" r="2"/>
        <circle cx="9" cy="11" r="2"/>
        <circle cx="13" cy="15" r="2"/>
        <circle cx="21" cy="7" r="2"/>
      </svg>
    ),
  },
  {
    id: 'DSK-03',
    title: 'Task-Labeled Datasets',
    description: 'Annotated manipulation primitives with domain-specific taxonomies.',
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="6" height="6" rx="1"/>
        <rect x="9" y="2" width="6" height="6" rx="1"/>
        <rect x="16" y="2" width="6" height="6" rx="1"/>
        <rect x="2" y="9" width="6" height="6" rx="1"/>
        <rect x="9" y="9" width="6" height="6" rx="1"/>
        <rect x="16" y="9" width="6" height="6" rx="1"/>
        <rect x="2" y="16" width="6" height="6" rx="1"/>
        <rect x="9" y="16" width="6" height="6" rx="1"/>
        <rect x="16" y="16" width="6" height="6" rx="1"/>
      </svg>
    ),
  },
];

export default function DataSection() {
  return (
    <section id="data" className={styles.dataSection}>
      <div className={styles.dataSectionInner}>
        <h2 className={styles.dataHeadline}>
          FROM <span className={styles.highlight}>FACTORY TO TRAINING.</span> THREE ACTIONABLE DATA PRODUCTS, <span className={styles.highlight}>UPDATED CONTINUOUSLY.</span>
        </h2>

        <div className={styles.dataCards}>
          {dataProducts.map((product) => (
            <div key={product.id} className={styles.dataCard}>
              <div className={styles.dataCardIcon}>
                {product.icon}
              </div>
              <span className={styles.dataCardId}>{product.id}</span>
              <h3 className={styles.dataCardTitle}>{product.title}</h3>
              <p className={styles.dataCardDesc}>{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
