import { NextResponse } from "next/server";
import { Client } from "@microsoft/microsoft-graph-client";
import { ConfidentialClientApplication } from "@azure/msal-node";
// https://account.microsoft.com/ - account microsoft
// https://portal.azure.com/ - portal azure
// https://entra.microsoft.com/ - change settings for azure entra id: Hybrid managment
// -> Microsoft Entra Connect -> connect sync -> Email as alternate login ID -> true нада для логина через имейл без домена

// Manifest roles
// "appRoles": [
//   {
//     "allowedMemberTypes": [
//       "User"
//     ],
//     "description": "Admin role",
//     "displayName": "Admin",
//     "id": "a2b3c4d5-6789-1234-5def-abc123456789",
//     "isEnabled": true,
//     "origin": "Application",
//     "value": "Admin"
//   },
//   {
//     "allowedMemberTypes": [
//       "User"
//     ],
//     "description": "Basic user role",
//     "displayName": "User",
//     "id": "d1c2b5e8-1234-5678-9abc-def123456789",
//     "isEnabled": true,
//     "origin": "Application",
//     "value": "User"
//   }
// ],

const msalConfig = {
  auth: {
    clientId: 'c577cb28-8186-452a-bd10-f7959be58846', // client id
    authority: 'https://login.microsoftonline.com/aa0f19b4-9ba6-44d0-8cd2-aee9ee6e7707', // tenant id
    clientSecret: process.env.CLIENT_SECRET, // Certificates & secrets -> client secrets -> value
  },
};

async function getAccessToken() {
  const cca = new ConfidentialClientApplication(msalConfig);
  const tokenResponse = await cca.acquireTokenByClientCredential({
    scopes: ["https://graph.microsoft.com/.default"],
  });
  return tokenResponse?.accessToken;
}

export async function POST(req: Request) {
  try {
    const { email, password, role = "Admin" } = await req.json();

    const token = await getAccessToken();
    if (!token) {
      return NextResponse.json({ error: "Не удалось получить токен" }, { status: 500 });
    }

    const client = Client.init({
      authProvider: (done) => done(null, token),
    });

    // const servicePrincipal = await client.api('/servicePrincipals').filter(`appId eq 'c577cb28-8186-452a-bd10-f7959be58846'`).get();
    // console.log('Service Principal:', servicePrincipal.value[0].id); // how to get servicePrincipal Id

    const user = await client.api('/users').create({
      accountEnabled: true,
      displayName: email.split("@")[0],
      mailNickname: email.split("@")[0],
      userPrincipalName: `${email.split("@")[0]}@maksimchupilinyandex.onmicrosoft.com`,
      mail: email,
      otherMails: [email],
      passwordProfile: {
        password: password,
        forceChangePasswordNextSignIn: false,
      },
    });

    // await client.api(`/users/${user.id}`).update({ // add custom field for user
    //   "extension_c577cb28-8186-452a-bd10-f7959be58846_isDeveloper": true
    // });

    // const userData = await client.api(`/users/${user.id}`).get(); чекнуть что эта дичь с доп полем записалась
    // console.log(userData);

    const servicePrincipal = "e7fb0c0e-28ff-42b4-bbda-e22d83fcef41"; // servicePrincipal
    const roleIdMap = {
      "User": "d1c2b5e8-1234-5678-9abc-def123456789", // id in manifest(random) at the top in files
      "Admin": "a2b3c4d5-6789-1234-5def-abc123456789",
    };

    await client.api(`/users/${user.id}/appRoleAssignments`).post({
      principalId: user.id,
      resourceId: servicePrincipal,
      appRoleId: roleIdMap[role] || roleIdMap["User"],
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error when user created', error);
    return NextResponse.json({ error: 'Error when user created' }, { status: 500 });
  }
}

