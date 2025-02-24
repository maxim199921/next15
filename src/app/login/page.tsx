'use client'

import React, { useEffect } from 'react';
import { useMsal } from "@azure/msal-react";
import { Button } from '@/shared/ui/button';
import { useRouter } from 'next/navigation';
import { loginRequest } from '@/config/authConfig';

export default function Page(): React.ReactElement {
  const { instance, accounts } = useMsal();
  const router = useRouter();

  useEffect(() => {
    if (accounts.length > 0) {
      router.push("/profile");
    }
  }, [accounts, router]);

  const handleLogin = () => {
    instance.loginRedirect({
      scopes: loginRequest.scopes,
    });
  };

  return (
    <div>
      <Button onClick={handleLogin}>Enter through Azure</Button>
    </div>
  );
}
