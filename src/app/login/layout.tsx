import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>LOGIN</div>
      {children}
    </div>
  );
}
