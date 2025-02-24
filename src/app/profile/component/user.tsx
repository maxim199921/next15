'use client';

import React from 'react';
import { useMsal } from '@azure/msal-react';
import { Button } from '@/shared/ui/button';
import { loginRequest } from '@/config/authConfig';

import { jwtDecode } from 'jwt-decode';

export function User(): React.ReactElement {
  const { accounts, instance } = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  const user = accounts[0];
  console.log(user) // app name | Users and groups

  // чек sso
  const getSilentToken = async () => {
    try {
      const response = await instance.acquireTokenSilent({
        scopes: loginRequest.scopes,
        account: accounts[0],
      });

      const silent = await callMsGraph(response.accessToken);

      console.log("Silent token:", silent);

      const rolesGet = await callMsGraphRoles(response.accessToken);

      console.log("Roles user:", rolesGet);

      const decodedToken = jwtDecode(response.accessToken); // access-токен декодируем
      console.log("Decoded token:", decodedToken);
      console.log("isDeveloper fieald:", decodedToken['extension_c577cb28-8186-452a-bd10-f7959be58846_isDeveloper']);


    } catch (error) {
      // можно редиректнуть на логинку
    }
  };

  async function callMsGraph(accessToken: string) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
    headers.append('Authorization', bearer);
    return fetch('https://graph.microsoft.com/v1.0/me', {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
  }

  async function callMsGraphRoles(accessToken: string) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
    headers.append('Authorization', bearer);
    const response = await fetch('https://graph.microsoft.com/v1.0/me/appRoleAssignments', {
      method: 'GET',
      headers: headers,
    });
    const data = await response.json();
    return data.value;
  }

  return (
    <div>
      <h1>Hello {user?.name}!</h1>
      <p>Email: {user?.username}</p>
      <p>Role: {user?.idTokenClaims?.roles?.toString()}</p>

      <div><Button onClick={getSilentToken}>check sso token</Button></div>
      <div>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
}
