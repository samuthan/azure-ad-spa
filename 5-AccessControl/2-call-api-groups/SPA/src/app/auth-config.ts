/**
 * This file contains authentication parameters. Contents of this file
 * is roughly the same across other MSAL.js libraries. These parameters
 * are used to initialize Angular and MSAL Angular configurations in
 * in app.module.ts file.
 */

import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig: Configuration = {
    auth: {
        clientId: '8bc2d28b-fe3b-44fb-ae0b-609bb18776f4', // This is the ONLY mandatory field that you need to supply.
        authority: 'https://login.microsoftonline.com/cdf5f84a-b4cf-4e96-a6b8-fd7a0114b952', // Defaults to "https://login.microsoftonline.com/common"
        redirectUri: '/auth', // Points to window.location.origin by default. You must register this URI on Azure portal/App Registration.
        postLogoutRedirectUri: '/', // Points to window.location.origin by default.
    },
    cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: isIE, // Set this to "true" if you are having issues on IE11 or Edge. Remove this line to use Angular Universal
    },
    system: {
        /**
         * Below you can configure MSAL.js logs. For more information, visit:
         * https://docs.microsoft.com/azure/active-directory/develop/msal-logging-js
         */
        loggerOptions: {
            loggerCallback(logLevel: LogLevel, message: string) {
                console.log(message);
            },
            logLevel: LogLevel.Verbose,
            piiLoggingEnabled: false
        }
    }
}

/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const protectedResources = {
    apiTodoList: {
        endpoint: "http://localhost:4000/api/todolist",
        scopes: ["api://8bc2d28b-fe3b-44fb-ae0b-609bb18776f4/access_via_group_assignments"]
    },
    apiGraph: {
        endpoint: "https://graph.microsoft.com/v1.0/me/checkMemberGroups",
        scopes: ["User.Read", "GroupMember.Read.All"]
    }
}

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: [...protectedResources.apiTodoList.scopes]
};

export const groups = {
    groupAdmin: "a8cec6a6-4fd1-46e8-87bb-b6c75e9b7be2",
    groupMember: "8b1c9083-1179-4894-912b-16a66c23e112"
}

/**
 * IMPORTANT: In case of overage, group list is cached for 1 hr by default, and thus cached groups 
 * will miss any changes to a users group membership for this duration. For capturing real-time 
 * changes to a user's group membership, consider implementing Microsoft Graph change notifications. 
 * For more information, visit: https://learn.microsoft.com/graph/api/resources/webhooks
 */
 export const CACHE_TTL_IN_MS = 60 * 60 * 1000; // 1 hour in milliseconds