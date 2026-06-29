const AUTH_STORAGE_KEY = "oauth_token";
const OAUTH_STATE_KEY = "oauth_state";
const OAUTH_RETURN_TO_KEY = "oauth_return_to";

const OAUTH_ISSUER_BASE_URL = import.meta.env.VITE_OAUTH_ISSUER_BASE_URL || "http://auth-server.vn:8081";
const OAUTH_CLIENT_ID = import.meta.env.VITE_OAUTH_CLIENT_ID || "";
const OAUTH_CLIENT_SECRET = import.meta.env.VITE_OAUTH_CLIENT_SECRET || "";
const OAUTH_SCOPES = import.meta.env.VITE_OAUTH_SCOPES || "openid profile";

function getRedirectUri() {
    return import.meta.env.VITE_OAUTH_REDIRECT_URI || window.location.origin;
}

function randomString(length = 64) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    const bytes = crypto.getRandomValues(new Uint8Array(length));
    return Array.from(bytes, (byte) => chars[byte % chars.length]).join("");
}

export function getStoredToken() {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
        return null;
    }

    try {
        const token = JSON.parse(raw);
        if (token.expiresAt && Date.now() > token.expiresAt) {
            clearStoredToken();
            return null;
        }
        return token;
    } catch {
        clearStoredToken();
        return null;
    }
}

export function clearStoredToken() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function getAccessToken() {
    return getStoredToken()?.access_token || null;
}

export function isAuthenticated() {
    return Boolean(getAccessToken());
}

export async function beginAuthorizationCodeFlow(returnTo = "/") {
    if (!OAUTH_CLIENT_ID) {
        throw new Error("Missing VITE_OAUTH_CLIENT_ID");
    }

    const state = randomString(32);

    sessionStorage.setItem(OAUTH_STATE_KEY, state);
    sessionStorage.setItem(OAUTH_RETURN_TO_KEY, returnTo);

    const authorizeUrl = new URL(`${OAUTH_ISSUER_BASE_URL}/oauth2/authorize`);
    authorizeUrl.searchParams.set("response_type", "code");
    authorizeUrl.searchParams.set("client_id", OAUTH_CLIENT_ID);
    authorizeUrl.searchParams.set("scope", OAUTH_SCOPES);
    authorizeUrl.searchParams.set("redirect_uri", getRedirectUri());
    authorizeUrl.searchParams.set("state", state);

    window.location.assign(authorizeUrl.toString());
}

export async function exchangeCodeForTokenFromUrl() {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const error = url.searchParams.get("error");

    if (!code && !error) {
        return {handled: false};
    }

    if (error) {
        cleanupAuthSession();
        clearQueryString();
        return {handled: true, success: false, error: error};
    }

    const expectedState = sessionStorage.getItem(OAUTH_STATE_KEY);

    if (!state || !expectedState || state !== expectedState) {
        cleanupAuthSession();
        clearQueryString();
        return {handled: true, success: false, error: "Invalid OAuth state"};
    }

    const tokenEndpoint = `${OAUTH_ISSUER_BASE_URL}/oauth2/token`;
    const body = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: getRedirectUri(),
        client_id: OAUTH_CLIENT_ID
    });

    if (OAUTH_CLIENT_SECRET) {
        body.set("client_secret", OAUTH_CLIENT_SECRET);
    }

    try {
        const response = await fetch(tokenEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body
        });

        if (!response.ok) {
            throw new Error(`Token exchange failed: ${response.status}`);
        }

        const payload = await response.json();
        const expiresInMs = Number(payload.expires_in || 3600) * 1000;

        localStorage.setItem(
            AUTH_STORAGE_KEY,
            JSON.stringify({
                ...payload,
                expiresAt: Date.now() + expiresInMs
            })
        );

        const returnTo = sessionStorage.getItem(OAUTH_RETURN_TO_KEY) || "/";
        cleanupAuthSession();
        clearQueryString();

        return {handled: true, success: true, returnTo};
    } catch (e) {
        cleanupAuthSession();
        clearStoredToken();
        clearQueryString();
        return {handled: true, success: false, error: e.message};
    }
}

function clearQueryString() {
    const cleanUrl = `${window.location.origin}${window.location.pathname}${window.location.hash}`;
    window.history.replaceState({}, document.title, cleanUrl);
}

function cleanupAuthSession() {
    sessionStorage.removeItem(OAUTH_STATE_KEY);
    sessionStorage.removeItem(OAUTH_RETURN_TO_KEY);
}
