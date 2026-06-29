import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Alert, Container} from "react-bootstrap";
import {exchangeCodeForTokenFromUrl} from "./oauth2";
import {useAuth} from "./AuthContext";

export function AuthCallbackHandler() {
    const navigate = useNavigate();
    const location = useLocation();
    const {refreshFromStorage} = useAuth();

    useEffect(() => {
        let isMounted = true;

        const run = async () => {
            const result = await exchangeCodeForTokenFromUrl();
            if (!isMounted || !result.handled) {
                return;
            }

            if (result.success) {
                refreshFromStorage();
                navigate(result.returnTo || "/", {replace: true});
                return;
            }

            navigate("/", {
                replace: true,
                state: {
                    authError: result.error || "OAuth login failed"
                }
            });
        };

        run();

        return () => {
            isMounted = false;
        };
    }, [location.key, navigate, refreshFromStorage]);

    const hasCallbackParams = new URLSearchParams(window.location.search).has("code")
        || new URLSearchParams(window.location.search).has("error");

    if (!hasCallbackParams) {
        return null;
    }

    return (
        <Container className="mt-3">
            <Alert variant="info">Processing sign-in...</Alert>
        </Container>
    );
}

