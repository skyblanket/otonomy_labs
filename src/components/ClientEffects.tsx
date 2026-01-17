'use client';

import { useEncryptEffect } from '@/hooks/useEncryptEffect';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionTimeline from './SectionTimeline';

export default function ClientEffects() {
  useEncryptEffect();
  useScrollReveal();

  return <SectionTimeline />;
}
