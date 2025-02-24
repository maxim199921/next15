import { Configuration } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: "c577cb28-8186-452a-bd10-f7959be58846", // Application ID из Azure
    authority: "https://login.microsoftonline.com/aa0f19b4-9ba6-44d0-8cd2-aee9ee6e7707", // Tenant ID из Azure
    redirectUri: "http://localhost:3000/profile", // URL, на который будет перенаправлен пользователь после успешной аутентификации
  },
  cache: {
    cacheLocation: "sessionStorage", // нада указать чтоб писал туда токены
  },
};


export const loginRequest = {
  scopes: ["User.Read"], // Добавить нужные scopes, включая роли, если нужно
};
