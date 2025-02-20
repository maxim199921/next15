import { NextResponse } from "next/server";
import { Client } from "@microsoft/microsoft-graph-client";
import { ConfidentialClientApplication } from "@azure/msal-node";

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
    const { email, password } = await req.json();

    const token = await getAccessToken();
    if (!token) {
      return NextResponse.json({ error: "Не удалось получить токен" }, { status: 500 });
    }

    const client = Client.init({
      authProvider: (done) => done(null, token),
    });

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

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error when user created', error);
    return NextResponse.json({ error: 'Error when user created' }, { status: 500 });
  }
}
