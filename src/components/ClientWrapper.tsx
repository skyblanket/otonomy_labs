'use client';

import { ReactNode } from 'react';
import { SoundProvider } from './SoundContext';
import CustomCursor from './CustomCursor';

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <SoundProvider>
      <CustomCursor />
      {children}
    </SoundProvider>
  );
}
