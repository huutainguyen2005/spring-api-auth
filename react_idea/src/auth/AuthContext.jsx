import {createContext, useContext, useMemo, useState} from "react";
import {beginAuthorizationCodeFlow, clearStoredToken, getStoredToken} from "./oauth2";

const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const [token, setToken] = useState(getStoredToken());

    const value = useMemo(() => ({
        token,
        isAuthenticated: Boolean(token?.access_token),
        async login(returnTo = "/") {
            await beginAuthorizationCodeFlow(returnTo);
        },
        logout() {
            clearStoredToken();
            setToken(null);
        },
        refreshFromStorage() {
            setToken(getStoredToken());
        }
    }), [token]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
}
