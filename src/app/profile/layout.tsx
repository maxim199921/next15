'use client'

import React from 'react';
import { Loader } from 'lucide-react';
import useAuth from '@/app/core/hooks/auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isCheckingAuth } = useAuth();

  if (isCheckingAuth) {
    return <Loader />;
  }

  return (
    <div>
      <div>PROFILE</div>
      {children}
    </div>
  );
}
