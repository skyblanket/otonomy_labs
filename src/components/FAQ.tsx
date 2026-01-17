'use client';

import { useState } from 'react';
import styles from './FAQ.module.css';

const faqs = [
  {
    question: 'What kind of data do you capture?',
    answer: 'We capture factory-embedded manipulation data using head-mounted egocentric cameras paired with dual wrist cameras. This includes raw video streams, 3D hand joint trajectories, and task-labeled manipulation sequences. All data is integrated with motion capture systems for ground truth validation.',
  },
  {
    question: 'How accurate are your trajectory extractions?',
    answer: 'Our pipeline achieves 10-15mm pose accuracy using state-of-the-art SAM 3D body estimation combined with Depth Pro monocular depth and multi-view triangulation. Every trajectory is validated against biomechanical constraints and undergoes physics-based quality validation with human review.',
  },
  {
    question: 'Why is your approach better than teleoperation or simulation?',
    answer: "Teleoperation requires expensive hardware and is limited to lab environments. Simulation suffers from the sim-to-real gap and unrealistic physics. Internet video lacks depth data and ground truth. Our dedicated infrastructure captures real humans performing real tasks in real factories, providing physics-validated trajectories at scale without these limitations.",
  },
  {
    question: 'What data formats do you support?',
    answer: 'We deliver training-ready datasets in standardized formats compatible with major robotics frameworks. This includes raw video streams, extracted 3D joint trajectories (quality-filtered and physics-validated), and task-labeled sequences with domain-specific taxonomies. Data is accessible via streaming delivery and comprehensive API endpoints.',
  },
  {
    question: 'How much data do you have available?',
    answer: 'Our infrastructure has captured over 30,000 hours of manipulation data, resulting in more than 3 million trajectories. Our pipeline runs 24/7, continuously collecting and processing new data from factory environments. Scalable storage ensures we can grow to meet any training requirements.',
  },
  {
    question: 'Can I get custom data collection for specific tasks?',
    answer: "Yes, we offer custom data collection programs tailored to your specific manipulation tasks and industrial environments. Our forward-deployed research teams can capture data for your unique use cases. Contact us to discuss your requirements and we'll design a collection program that fits your needs.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className={styles.faqSection}>
      <div className={styles.faqContent}>
        <div className={styles.faqHeader}>
          <h2>Frequently Asked Questions</h2>
          <p>
            If you can&apos;t find an answer here, reach out to us at{' '}
            <a href="mailto:akash.otonomy@gmail.com">akash.otonomy@gmail.com</a>
          </p>
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div key={index} className={`${styles.faqItem} ${openIndex === index ? styles.open : ''}`}>
              <button className={styles.faqQuestion} onClick={() => toggleFaq(index)}>
                <h3>{faq.question}</h3>
                <span className={styles.faqToggle}>{openIndex === index ? '−' : '+'}</span>
              </button>
              <div className={styles.faqAnswer}>
                <div className={styles.faqAnswerInner}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
