'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import ClientComponents with optimized loading
const DynamicClientComponents = dynamic(
  () => import('./ClientComponents'),
  { 
    ssr: false,
    loading: () => null 
  }
);

export default function ClientComponentsWrapper() {
  return (
    <Suspense fallback={null}>
      <DynamicClientComponents />
    </Suspense>
  );
}