'use client';

import React from 'react';
import { useMsal } from '@azure/msal-react';
import { Button } from '@/shared/ui/button';
import { InputOTP } from '@/shared/ui/input-otp';

export function User(): React.ReactElement {
  const { accounts, instance } = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  const user = accounts[0];
  console.log(user)

  return (
    <div>
      <h1>Hello {user?.name}!</h1>
      <p>Email: {user?.username}</p>
      <div>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
}
