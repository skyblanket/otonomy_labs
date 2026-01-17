'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [showCopyToast, setShowCopyToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  const copyEmail = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const emailToCopy = 'akash.otonomy@gmail.com';

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(emailToCopy);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = emailToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setShowCopyToast(true);
      setTimeout(() => setShowCopyToast(false), 1200);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, []);

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.footerCtaSection}>
        <div className={styles.footerCtaContent}>
          <h3 className={styles.footerCtaTitle}>GET DATA</h3>
          <p className={styles.footerCtaText}>
            Ready to train your humanoid? Access factory-captured manipulation trajectories at scale.
          </p>
          <button onClick={copyEmail} className={styles.footerCtaBtn}>
            CONTACT US
            <Image src="/copy.svg" alt="copy" width={16} height={16} className={styles.copyIcon} />
            <span className={`${styles.copyToast} ${showCopyToast ? styles.show : ''}`}>
              EMAIL COPIED
            </span>
          </button>
        </div>
      </div>

      <div className={styles.footerTop}>
        <div className={styles.footerCol}>
          <span className={styles.footerColTitle}>
            Sign up for the latest<br />news & insights
          </span>
          <form className={styles.footerEmailInput} onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">→</button>
          </form>
        </div>

        <div className={styles.footerCol}>
          <a href="https://twitter.com" className={styles.footerLink} target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          <a href="https://linkedin.com" className={styles.footerLink} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com" className={styles.footerLink} target="_blank" rel="noopener noreferrer">
            Github
          </a>
        </div>

        <div className={styles.footerCol}>
          <span className={styles.footerCopyrightText}>
            © 2026<br />Otonomy Labs Inc.
          </span>
        </div>

        <div className={styles.footerCol}>
          <a href="#" className={styles.footerLink}>Terms & Conditions</a>
          <a href="#" className={styles.footerLink}>Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
