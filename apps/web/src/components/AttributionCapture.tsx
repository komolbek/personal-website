'use client';

// Mounted once in the root layout so attribution is recorded on whichever page
// the visitor arrives at, not only on the contact form. Renders nothing.

import { useEffect } from 'react';
import { captureAttribution } from '@/lib/attribution';

export function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return null;
}
